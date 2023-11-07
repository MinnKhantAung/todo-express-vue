import express from 'express';
import { Register, Login, CurrentUser } from '../controllers/UserController.js'
import { ValidToken } from '../middlewares/ValidationHandler.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/current', ValidToken, CurrentUser)

export default router;