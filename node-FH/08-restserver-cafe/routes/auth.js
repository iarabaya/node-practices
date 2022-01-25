const { Router } = require('express');
const { check } = require('express-validator');

const { validateInput }  = require('../middlewares/validate-input')

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login',[
  check('email', 'The email is required').isEmail(),
  check('password', 'The password is required').notEmpty(),
  validateInput
], login);

router.post('/google',[
  check('id_token', 'id_token is required').notEmpty(),
  validateInput
], googleSignIn);

module.exports = router;

