import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../schema/authSchema";
import Auth from "../models/Auth";
import { IAuth, IAuthResponse } from "../types/auth/IAuth";
import { IResponse } from "../types/share/IResponse";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function loginUser(request: Request, response: Response<IResponse<IAuthResponse>>) {
    try {
        const { email, password } = request.body;
        const validation = await loginSchema.validate(request.body, { abortEarly: false });
        if (validation.error) {
            return response.status(400).json({ success: false, error: validation.error.details.map((err) => err.message) });
        }

        const findUser: IAuth | null = await Auth.findOne({ email });

        if (!findUser) {
            return response.status(404).json({ success: false, error: "The fullname or password is incorrect" })
        }

        const passwordMatch: boolean = await bcrypt.compare(password, findUser.password);

        if (!passwordMatch) {
            return response.status(401).json({ success: false, error: "The fullname or password is incorrect" });
        }

        const accessToken = generateAccessToken(findUser);
        const refreshToken = generateRefreshToken(findUser);

        response.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

        response.status(200).json({ success: true, data: { accessToken, userId: findUser._id } });
    } catch (error: any) {
        return response.status(500).json({ success: false, error: "Internal Server Error" })

    }
}


export async function registerUser(request: Request, response: Response<IResponse<IAuthResponse>>) {
    try {
        const { email, password } = request.body;
        const validation = await registerSchema.validate(request.body, { abortEarly: false });
        if (validation.error) {
            return response.status(400).json({ success: false, error: validation.error.details.map((err) => err.message) });
        }

        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ success: false, error: 'Email is already registered' });
        }

        const passwordHash: string = await bcrypt.hash(password, 10);

        const data: IAuth = await Auth.create({ ...request.body, password: passwordHash });

        const accessToken = generateAccessToken(data);
        const refreshToken = generateRefreshToken(data);

        response.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

        return response.status(201).json({ success: true, data: { accessToken, userId: data._id } })
    } catch (error: any) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const fieldName: string = Object.keys(error.keyValue)[0];
            let errorMessage = `${fieldName.split(".")[0]} value is already in use`;
            return response.status(400).json({ success: false, error: errorMessage });
        }
        return response.status(500).json({ success: false, error: "Internal Server Error" })

    }
}

export async function refreshTokenUser(request: Request, response: Response<IResponse<IAuthResponse>>) {
    const refreshToken: string = request.cookies.refreshToken.split(" ")[1];

    if (!refreshToken) {
        return response.status(403).json({ success: false, error: 'Refresh token missing' });
    }

    try {
        const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IAuth;

        const accessToken: string = generateAccessToken(data);

        response.status(200).json({ success: true, data: { accessToken, userId: data._id } });
    } catch (error: any) {
        console.log(error.message);
        response.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export async function signOutUser(request: Request, response: Response<IResponse<IAuthResponse>>) {
    response.clearCookie('refreshToken', { httpOnly: true, secure: true });
    return response.status(200).json({ success: true })

}