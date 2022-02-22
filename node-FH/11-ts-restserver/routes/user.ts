import { Router } from 'express';
import { getUser, getUsers, postUser, putUser, deleteUser } from '../controllers/user';


const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.get('/', postUser);

router.get('/:id', putUser);

router.get('/:id', deleteUser);


export default router;