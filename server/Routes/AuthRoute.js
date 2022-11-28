import express from "express";
import { registeUSer,LoginUser } from "../Controllers/AuthController.js";

const router = express.Router();


router.post('/register', registeUSer)
router.post('/login', LoginUser)

export default router;