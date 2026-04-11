const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin, handleValidationErrors } = require('../middleware/validation');
const passport = require('../config/passport');
const { generateToken } = require('../utils/jwt');

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = generateToken(req.user.id, req.user.role);
    res.redirect(`/?token=${token}&name=${encodeURIComponent(req.user.name)}&role=${req.user.role}`);
  }
);

module.exports = router;
