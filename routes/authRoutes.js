const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin, handleValidationErrors } = require('../middleware/validation');
const passport = require('../config/passport');
const { generateToken } = require('../utils/jwt');

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const params = new URLSearchParams({
        authError: info?.message || 'Google sign-in failed'
      });

      if (info?.email) {
        params.set('email', info.email);
      }

      return res.redirect(`/?${params.toString()}`);
    }

    const token = generateToken(user.id, user.role);
    const params = new URLSearchParams({
      token,
      name: user.name,
      role: user.role
    });

    return res.redirect(`/?${params.toString()}`);
  })(req, res, next);
});

module.exports = router;
