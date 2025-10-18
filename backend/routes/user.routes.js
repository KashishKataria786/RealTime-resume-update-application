import express from 'express';
import { userRegister ,userLogin} from '../controllers/user.controllers.js';


const userRouter = express.Router();

userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);

export default userRouter;