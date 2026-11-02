const session = require('express-session');
const RedisStore = require('connect-redis')(session); 

app.use(session({
  name: '__Host-pms_sess', 
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    httpOnly: true,              
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict',         
    maxAge: 1000 * 60 * 60 * 2,  
  }
}));

// Login  Session Fixation 
app.post('/api/login', (req, res) => {
  // after password confirom
  req.session.regenerate((err) => {
    req.session.userId = user.id;
    req.session.role = user.role;
    res.json({ message: "Logged in securely!" });
  });
});