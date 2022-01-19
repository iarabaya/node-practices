const { Router } = require('express');
const { check } = require('express-validator');

const { validateInput } = require('../middlewares/validate-input');
const { isValidRole } = require('../helpers/db-validators');

const { usersGet, 
        usersPost, 
        usersDelete, 
        usersPatch, 
        usersPut } = require('../controllers/users');

const router = Router();

/* PATH: /api/users */

router.get('/', usersGet);

router.post('/',[
        check('name', 'You must provide a name').not().isEmpty(),
        check('password', 'Password must be 6 characters or longer').isLength({ min: 6 }),
        check('email', 'Invalid email').isEmail(),
        // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isValidRole ),
        validateInput
], usersPost);

//con parametro id
router.put('/:id', usersPut);

router.patch('/', usersPatch);

router.delete('/', usersDelete);


module.exports = router