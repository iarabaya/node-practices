const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles } = require('../controllers/uploads');

const { validateInput }  = require('../middlewares/validate-input')

const router = Router();

/* PATH: {{url}}/api/uploads */

router.post('/', uploadFiles );


module.exports = router;

