# Secure Authentication with HttpOnly Cookies (Express + React)

This guide shows how to store a JWT in an **HttpOnly cookie** instead of `localStorage`, so JavaScript on the page cannot read the token.

## Table of Contents

- [How It Works](#how-it-works)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Backend Setup](#backend-setup)
  - [1. Install dependencies](#1-install-dependencies)
  - [2. Configure the server](#2-configure-the-server)
  - [3. Login and logout controller](#3-login-and-logout-controller)
  - [4. Auth middleware](#4-auth-middleware)
- [Frontend Setup](#frontend-setup)
- [Security Notes](#security-notes)
- [Troubleshooting](#troubleshooting)

## How It Works

1. The user logs in with a username and password.
2. The server verifies the credentials and signs a JWT.
3. The server sends the JWT in a `Set-Cookie` header with `HttpOnly`, `Secure` and `SameSite` flags.
4. The browser automatically attaches the cookie to every later request.
5. The auth middleware reads and verifies the token from `req.cookies`.
6. On logout, the server clears the cookie.

## Prerequisites

- Node.js 18+
- Express
- A React (or any) frontend running on a separate port
- Packages: `cookie-parser`, `cors`, `jsonwebtoken`

## Environment Variables

Create a `.env` file in your backend folder (and add it to `.gitignore`):

```env
NODE_ENV=development
PORT=5000
JWT_SECRET=replace_with_a_long_random_string
```

> **Never commit `.env` to GitHub.**

## Backend Setup

### 1. Install dependencies

```bash
npm install express cors cookie-parser jsonwebtoken dotenv
```

### 2. Configure the server

`server.js` (or `app.js`):

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Required when running behind a proxy (Nginx, Heroku, Render, etc.)
// so that `secure` cookies are set correctly.
app.set('trust proxy', 1);

app.use(cors({
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true,               // REQUIRED so cookies can be sent
}));
app.use(express.json());
app.use(cookieParser());           // lets us read req.cookies
```

### 3. Login and logout controller

`controller/userController.js`:

```javascript
const jwt = require('jsonwebtoken');

const cookieOptions = {
  httpOnly: true,                                  // JS cannot read the cookie
  secure: process.env.NODE_ENV === 'production',   // HTTPS only in production
  sameSite: 'strict',                              // CSRF protection
  maxAge: 24 * 60 * 60 * 1000,                     // 1 day
};

async function login(req, res) {
  const { username, password } = req.body;

  // ... find the user and verify the password first ...

  const token = jwt.sign(
    { userid: user.userid, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d', algorithm: 'HS256' }
  );

  res.cookie('token', token, cookieOptions);

  // Do NOT send the token in the JSON body. It lives in the cookie.
  return res.status(200).json({
    msg: 'Login successful',
    user: { username: user.username, role: user.role },
  });
}

function logout(req, res) {
  // Options (except maxAge) must match the ones used to set the cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({ msg: 'Logged out successfully' });
}

module.exports = { login, logout };
```

### 4. Auth middleware

`middleware/authMiddleware.js`:

```javascript
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Read the token from cookies, not from the Authorization header
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'Authentication invalid! Please login.' });
  }

  try {
    const { username, userid, role } = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'], // pin the algorithm
    });
    req.user = { username, userid, role };
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Authentication invalid or expired!' });
  }
}

module.exports = authMiddleware;
```

Use it on protected routes:

```javascript
const authMiddleware = require('./middleware/authMiddleware');

app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
```

## Frontend Setup

The browser only sends cookies cross-origin if you opt in.

### Axios

```javascript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // send cookies with every request
});

export default axiosInstance;
```

### Fetch

```javascript
fetch('http://localhost:5000/api/some-endpoint', {
  method: 'GET',
  credentials: 'include', // send cookies with the request
});
```

## Security Notes

| Topic | Details |
|-------|---------|
| **XSS** | `httpOnly` stops scripts from *stealing* the token, but it does not stop an attacker from making requests as the user. Sanitize output and set a Content-Security-Policy. |
| **CSRF** | `sameSite: 'strict'` protects well when frontend and backend share the same site. If they are on different sites in production, you need `sameSite: 'none'` + `secure: true` **plus** a CSRF token or custom header check. |
| **Logout** | Clearing the cookie does not invalidate a copied JWT. Use short expiry with refresh tokens, a revocation list, or server-side sessions (e.g. Redis) if this matters. |
| **Roles** | A token keeps its old `role` until it expires. For sensitive actions, re-check the role in the database. |
| **Secrets** | Use a long, random `JWT_SECRET` and never commit it. |
| **Rate limiting** | Add rate limiting (e.g. `express-rate-limit`) on the login route to slow brute-force attacks. |

## Troubleshooting

- **Cookie is not saved in the browser**
  Make sure both `credentials: true` (CORS) and `withCredentials: true` / `credentials: 'include'` (frontend) are set, and that the CORS `origin` is exact (not `*`).
- **Cookie not set in production**
  `secure: true` needs HTTPS. Behind a proxy, add `app.set('trust proxy', 1)`.
- **Cookie missing across different domains**
  `sameSite: 'strict'` blocks it. See the CSRF note above.
- **`req.cookies` is `undefined`**
  `cookieParser()` must be registered before your routes.

## License

MIT