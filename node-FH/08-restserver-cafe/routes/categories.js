const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateInput, isAdminRole } = require('../middlewares');

const { existsCategoryById } = require('../helpers/db-validators');

const { getCategories,
        getCategoryById, 
        createCategory,
        updateCategory,
        deleteCategory } = require('../controllers/categories');

const router = Router();

/* PATH: {{url}}/api/categories */

//Get all categories - public
router.get('/', getCategories);

//Get category by id - public
router.get('/:id', [
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existsCategoryById ),
  validateInput
], getCategoryById );

//Create category - private - anyone with valid token
router.post('/', [ 
  validateJWT,
  check('name', 'The name is required').notEmpty(),
  validateInput
 ], createCategory );

//Update category by id - private - anyone with valid token
router.put('/:id', [
  validateJWT,
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existsCategoryById ),
  check('name', 'The name is required').notEmpty(),
  validateInput
], updateCategory);

//Delete category by id - private - Only admin
router.delete('/:id', [ 
  validateJWT,
  isAdminRole,
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existsCategoryById ),
  validateInput
], deleteCategory);


module.exports = router;