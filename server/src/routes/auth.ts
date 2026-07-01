import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken = (user: any) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });
};

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth?token=${token}`);
  }
);

// GitHub Auth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth?token=${token}`);
  }
);

// Get Current User (Protected)
router.get('/me', (req, res) => {
  // In a real app, you'd use a middleware to verify the JWT token
  // and attach the user to req.user before hitting this endpoint.
  res.json({ message: 'User info would be returned here.' });
});

export default router;
