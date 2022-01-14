const { Router } = require('express');
const { usersGet, 
        usersPost, 
        usersDelete, 
        usersPatch, 
        usersPut } = require('../controllers/users');

const router = Router();

// router.get('/', (req,res)=>{
//   res.send('Hello world');
// });

router.get('/', usersGet);

router.post('/', usersPost);
//con parametro id
router.put('/:id', usersPut);

router.patch('/', usersPatch);

router.delete('/', usersDelete);


module.exports = router