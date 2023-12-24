import e, { NextFunction, Request, Response } from "express";
import { IAuth } from "../types/auth/IAuth";
const jwt = require('jsonwebtoken');

interface AuthRequest extends Request {
    user?: IAuth
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Invalid token" })

    jwt.verify(token, process.env.ACCESS_TOKEN, (err: any, user: any) => {

        if (err) {
            return res.status(400).json({ success: false, message: "Internal Error" })
        }
        req.user = user;
        next();

    })

}
