
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import cors from 'cors';

const app = express();

const STEAM_API_KEY = process.env.STEAM_API_KEY;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use(express.json()); 

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:5009/auth/steam/return',
  realm: 'http://localhost:5009/',
  apiKey: STEAM_API_KEY,
  passReqToCallback: true,
}, ( req, identifier, profile, done) => {
  profile.identifier = identifier;
  return done(null, profile);
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/auth/steam', passport.authenticate('steam'));

app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/login' }), 
(req, res) => {
  res.redirect('http://localhost:5173'); 
});

app.get('/api/user', (req, res) => {
  try {
    console.log('API User:', req.user);
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: 'User not authenticated' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send({ message: 'Logged out successfully' });
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(5009, () => {
  console.log('Server is running on port 5009');
});