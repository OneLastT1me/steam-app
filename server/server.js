import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import cors from 'cors';

const app = express();

// AFE2D7140F2D5F5FC25E29323A1E7FF6
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true // куки
}));

app.use(express.json()); // Для обработки JSON-запросов

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


passport.use(new SteamStrategy({
  returnURL: 'http://localhost:5009/auth/steam/return',
  realm: 'http://localhost:5009/',
  apiKey: 'AFE2D7140F2D5F5FC25E29323A1E7FF6',
  passReqToCallback: true,
}, async ( profile, done) => {
  const steamId = profile.id;

  const user = { id: steamId };
  console.log(profile,'iiii')
  return done(null, user);
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  console.log('Serialize user:', user);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log('Deserialize user:', obj);
  done(null, obj);
});


// Маршрут для начала аутентификации через Steam
app.get('/auth/steam', passport.authenticate('steam'));

// Маршрут для обработки ответа после аутентификации
app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/login' }), 
(req, res) => {
  console.log('Authenticated:', req.user);
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
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(5009, () => {
  console.log('Server is running on port 5009');
});