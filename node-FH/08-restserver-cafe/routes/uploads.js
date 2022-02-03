const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile } = require('../controllers/uploads');

const { validateInput }  = require('../middlewares/validate-input')

const router = Router();

/* PATH: {{url}}/api/uploads */

router.post('/', uploadFile );


module.exports = router;

