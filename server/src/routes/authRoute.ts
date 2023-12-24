import { Router } from "express";
import express from 'express';
import { loginUser, refreshTokenUser, registerUser, signOutUser } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRoute: Router = express.Router();
const path: string = "/auth";

authRoute.post(`${path}/login`, loginUser);
authRoute.post(`${path}/register`, registerUser);
authRoute.post(`${path}/signout`, authMiddleware, signOutUser);
authRoute.post(`${path}/refresh`, refreshTokenUser);



export default authRoute;