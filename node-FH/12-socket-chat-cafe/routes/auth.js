const { Router } = require('express');
const { check } = require('express-validator');

const { validateInput, validateJWT }  = require('../middlewares')

const { login, googleSignIn, renovateToken } = require('../controllers/auth');

const router = Router();

/* PATH: {{url}}/api/auth */

router.post('/login',[
  check('email', 'The email is required').isEmail(),
  check('password', 'The password is required').notEmpty(),
  validateInput
], login);

router.post('/google',[
  check('id_token', 'id_token is required').notEmpty(),
  validateInput
], googleSignIn);

router.get( '' , validateJWT, renovateToken )

module.exports = router;

