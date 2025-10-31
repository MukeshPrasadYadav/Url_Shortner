import { Router } from "express";
import { AuthController } from "../Controllers/AuthController";
import { VerifyUser } from "../Middlewares/VerifyUser";

const router=Router();

router.post('/signUp',AuthController.SignUp);
router.post('/login',AuthController.Login);
router.post('/logOut',VerifyUser,AuthController.Logout)

export const authRoutes=router;