const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateInput, isAdminRole } = require('../middlewares');

const { existsCategoryById, existsProductById } = require('../helpers/db-validators');

const { getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/products');

const router = Router();

/* PATH: {{url}}/api/products */

//Get all products - public
router.get('/', getProducts);

//Get product by id - public
router.get('/:id', [
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existsProductById ),
  validateInput
], getProductById );

//Create product - private - anyone with valid token
router.post('/', [ 
  validateJWT,
  check('name', 'The name is required').notEmpty(),
  check('category', 'The category id is required').notEmpty(),
  check('category', 'The category id is not valid').isMongoId(),
  check('category').custom( existsCategoryById ),
  validateInput
 ], createProduct );

//Update product by id - private - anyone with valid token
router.put('/:id', [
  validateJWT,
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existsProductById ),
  validateInput
], updateProduct);

//Delete product by id - private - Only admin
router.delete('/:id', [ 
  validateJWT,
  isAdminRole,
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existsProductById ),
  validateInput
], deleteProduct);


module.exports = router;