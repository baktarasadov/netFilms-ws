import { IAuth } from '../types/auth/IAuth';
import jwt from 'jsonwebtoken';

export const generateRefreshToken = (data: IAuth): string => {
    const refreshToken = jwt.sign(
        { userId: data._id },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '7d' }
    );
    return `Bearer ${refreshToken}`
}

export const generateAccessToken = (data: IAuth): string => {
    const accessToken = jwt.sign(
        { userId: data._id, fullname: data.fullname },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: '15min' }
    );
    return `Bearer ${accessToken}`
}