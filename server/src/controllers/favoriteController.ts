import { Request, Response } from 'express';
import { IResponse } from '../types/share/IResponse';
import { IFavorite } from '../types/favorite/IFavorite';
import Favorite from '../models/Favorite';
export async function getAllFavorites(request: Request, response: Response<IResponse<IFavorite[]>>) {
    try {
        const favorites: IFavorite[] = await Favorite.find({});
        if (!favorites.length) {
            return response.status(404).json({ success: false, error: "Favorites not found" })
        }

        return response.status(200).json({ success: true, data: favorites })
    } catch (error: any) {
        return response.status(500).json({ success: false, error: "Internal Server Error" })

    }

}