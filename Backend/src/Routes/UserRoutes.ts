import { SignUpUser } from "../Controllers/Auth";
import { Router } from "express";

const router=Router();

router.post(`/SignUp`,SignUpUser);

export default router;