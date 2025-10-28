import { SignUpUser } from "../Controllers/Auth";
import { Router } from "express";

const router=Router();

router.post(`/signUp`,SignUpUser);

export default router;