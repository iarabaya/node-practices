const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateInput, isAdminRole } = require('../middlewares');

const { createCategory } = require('../controllers/categories');

const router = Router();

/* PATH: {{url}}/api/categories */

//Get all categories - public
router.get('/', (req, res) => {
  res.json('get');
});

//Get category by id - public
router.get('/:id', (req, res) => {
  res.json('get by id');
});

//Create category - private - anyone with valid token
router.post('/', [ 
  validateJWT,
  check('name', 'The name is required').notEmpty(),
  validateInput
 ], createCategory );

//Update category by id - private - anyone with valid token
router.put('/:id', [ validateJWT ] ,(req, res) => {
  res.json('put');
});

//Delete category by id - private - Only admin
router.delete('/:id', [ 
  validateJWT,
  isAdminRole,
  validateInput
] ,(req, res) => {
  res.json('delete');
});


module.exports = router;