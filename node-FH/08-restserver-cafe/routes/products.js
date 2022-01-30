const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateInput, isAdminRole } = require('../middlewares');

const { existsCategory } = require('../helpers/db-validators');

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
  check('id').custom( existsCategory ),
  validateInput
], getProductById );

//Create product - private - anyone with valid token
router.post('/', [ 
  validateJWT,
  check('name', 'The name is required').notEmpty(),
  validateInput
 ], createProduct );

//Update product by id - private - anyone with valid token
router.put('/:id', [
  validateJWT,
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existsCategory ),
  check('name', 'The name is required').notEmpty(),
  validateInput
], updateProduct);

//Delete product by id - private - Only admin
router.delete('/:id', [ 
  validateJWT,
  isAdminRole,
  check('id', 'Invalid Id').isMongoId(),
  check('id').custom( existsCategory ),
  validateInput
], deleteProduct);


module.exports = router;