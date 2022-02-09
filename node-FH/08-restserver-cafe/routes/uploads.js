const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateImage, showImage } = require('../controllers/uploads');
const { availableCollections } = require('../helpers');

const { validateInput, validateUploadFile }  = require('../middlewares')

const router = Router();

/* PATH: {{url}}/api/uploads */

router.post('/', [validateUploadFile] , uploadFiles );

router.put('/:collection/:id', [
  validateUploadFile , 
  check('id', 'Invalid mongo id').isMongoId(),
  check('collection').custom(c => availableCollections(c, ['users', 'products'])),
  validateInput
], updateImage )

router.get('/:collection/:id', [
  check('id', 'Invalid mongo id').isMongoId(),
  check('collection').custom(c => availableCollections(c, ['users', 'products'])),
  validateInput
], showImage )

module.exports = router;

