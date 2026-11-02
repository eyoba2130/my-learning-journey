# Sessions vs Cookies in Express

A short guide to the difference between cookies and sessions, and how to apply each one in an Express project.

## The Core Idea

- **Cookie**: a small key-value pair stored in the **browser**. The browser sends it back with every request to your server.
- **Session**: data stored on the **server**. The browser only holds a **session ID**, and that ID is itself carried in a cookie.

So they are not opposites. A session *uses* a cookie to identify the user, but keeps the real data on the server.

## Comparison

| | Cookie | Session |
|---|---|---|
| Stored | In the browser (client) | On the server (memory, Redis, database) |
| Size limit | About 4 KB per cookie | Limited by your store, not the browser |
| Lifetime | Until `maxAge` / `expires`. Without them, it is a *session cookie* and ends when the browser closes | Until it expires, is destroyed on logout, or is removed from the store |
| Middleware | `cookie-parser` (needed to read `req.cookies`) | `express-session` |
| Security | Users can see and edit plain cookies, so never store secrets in them | Safer, since data never leaves the server |
| Speed | No server lookup | Needs a store lookup on each request |
| Best for | Preferences (theme, language), or carrying a token | Login state and user-specific data |

## Quick Examples

### Cookies

```bash
npm install cookie-parser
```

```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set', (req, res) => {
  res.cookie('theme', 'dark', { maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.send('Cookie set');
});

app.get('/get', (req, res) => res.send(`Theme: ${req.cookies.theme}`));

app.get('/clear', (req, res) => {
  res.clearCookie('theme');
  res.send('Cookie cleared');
});
```

### Sessions

```bash
npm install express-session
```

```javascript
const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.get('/set', (req, res) => {
  req.session.username = 'Abebe';
  res.send('Session set');
});

app.get('/get', (req, res) => res.send(`User: ${req.session.username}`));

app.get('/destroy', (req, res) => {
  req.session.destroy(() => res.send('Session destroyed'));
});
```

> **Warning:** the default session store keeps data in memory. It leaks memory and loses everything on restart, so it is **not for production**. Use Redis or a database store (see below).

## Applying It to Your Project

You have two ways to handle login. Pick **one**.

### Option A: Server-side session (recommended for most apps)

Session data lives in Redis. The browser holds only an ID cookie.

```javascript
const session = require('express-session');
const { RedisStore } = require('connect-redis'); // connect-redis v7+
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

app.use(session({
  name: isProd ? '__Host-pms_sess' : 'pms_sess',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
  },
}));
```

**Login** (regenerate the session to prevent session fixation):

```javascript
app.post('/api/login', (req, res, next) => {
  // ... verify credentials, get `user` ...
  req.session.regenerate((err) => {
    if (err) return next(err);
    req.session.userId = user.id;
    req.session.role = user.role;
    req.session.save((err) => {
      if (err) return next(err);
      res.json({ message: 'Logged in' });
    });
  });
});
```

**Protect routes:**

```javascript
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ msg: 'Please login' });
  next();
}
```

**Logout:**

```javascript
app.post('/api/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie(isProd ? '__Host-pms_sess' : 'pms_sess', { path: '/' });
    res.json({ message: 'Logged out' });
  });
});
```

### Option B: JWT stored in an HttpOnly cookie

No server-side store. The signed token itself lives in the cookie.

```javascript
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Login
const token = jwt.sign(
  { userid: user.userid, username: user.username, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1d', algorithm: 'HS256' }
);
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000,
});

// Middleware
const token = req.cookies.token;
const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
req.user = payload;
```

### Which one should I choose?

| Need | Choose |
|------|--------|
| Instant logout and the ability to revoke access | **Session (A)** |
| Role changes that should apply immediately | **Session (A)** |
| No extra infrastructure, or several stateless API servers | **JWT cookie (B)** |

With a JWT, logout only clears the cookie in that browser. A copied token stays valid until it expires.

## Frontend (both options)

The browser must be told to send cookies cross-origin:

```javascript
// Axios
axios.create({ baseURL: 'http://localhost:5000/api', withCredentials: true });

// Fetch
fetch(url, { credentials: 'include' });
```

And the backend CORS must allow it:

```javascript
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
```

## Security Checklist

- Always set `httpOnly`, `secure` (in production) and `sameSite` on auth cookies.
- Keep `SESSION_SECRET` / `JWT_SECRET` in `.env`, never in code or on GitHub.
- Use `saveUninitialized: false` so empty sessions are not stored.
- Never use the default memory store in production.
- Never put passwords or sensitive data in a plain cookie.
- If frontend and backend are on different sites, add real CSRF protection.
- Rate-limit the login route.

## Common Mistakes

| Problem | Fix |
|---------|-----|
| `req.cookies` is `undefined` | Register `cookieParser()` before your routes |
| Cookie not saved in the browser | Set `credentials: true` (CORS) and `withCredentials` / `credentials: 'include'` (frontend) |
| `secure` cookie missing in production | Use HTTPS and add `app.set('trust proxy', 1)` behind a proxy |
| `__Host-` cookie fails on localhost | Use a plain cookie name in development |