import { Request, Response } from 'express';
import { IResponse } from '../types/share/IResponse';
import { IFavorite } from '../types/favorite/IFavorite';
import Favorite from '../models/Favorite';
import joiFavoriteSchema from '../schema/favoriteSchema';


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

export async function saveFavorite(request: Request, response: Response<IResponse<IFavorite>>) {
    try {
        const { favoriteName, movies } = request.body;
        await joiFavoriteSchema.validate(request.body, { abortEarly: false });
        const validation = joiFavoriteSchema.validate({ favoriteName, movies }, { abortEarly: false });
        if (validation.error) {
            return response.status(400).json({ success: false, error: validation.error.details.map((err) => err.message) });
        }
        const favorite: IFavorite = await Favorite.create(request.body)
        return response.status(201).json({ success: true, data: favorite })
    } catch (error: any) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const fieldName: string = Object.keys(error.keyValue)[0];
            let errorMessage = `${fieldName.split(".")[0]} value is already in use`;
            return response.status(400).json({ success: false, error: errorMessage });
        }

        return response.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

export async function getFavorite(request: Request, response: Response<IResponse<IFavorite>>) {
    try {
        const { id } = request.params
        const favorite: IFavorite | null = await Favorite.findById(id);

        if (!favorite) {
            return response.status(404).json({ success: false, error: "Favorite not found!" });
        }
        return response.status(200).json({ success: true, data: favorite })
    } catch (error: any) {
        return response.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

export async function deleteFavorite(request: Request, response: Response<IResponse<IFavorite>>) {
    try {
        const { id } = request.params
        const favorite: IFavorite | null = await Favorite.findById(id);

        if (!favorite) {
            return response.status(404).json({ success: false, error: "Favorite not found!" });
        }
        await Favorite.findByIdAndDelete(id);
        return response.status(200).json({ success: true })
    } catch (error: any) {
        return response.status(500).json({ success: false, error: "Internal Server Error" })

    }

}

export async function updateFavorite(request: Request, response: Response<IResponse<IFavorite>>) {
    try {
        const { id } = request.params
        const favorite: IFavorite | null = await Favorite.findById(id);

        if (!favorite) {
            return response.status(404).json({ success: false, error: "Favorite not found!" });
        }
        await Favorite.findByIdAndUpdate(id, { ...request.body });
        const updatedData: IFavorite | null = await Favorite.findById(id);
        return response.status(200).json({ success: true, data: updatedData as IFavorite });
    } catch (error: any) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const fieldName: string = Object.keys(error.keyValue)[0];
            let errorMessage = `${fieldName.split(".")[0]} value is already in use`;
            return response.status(400).json({ success: false, error: errorMessage });
        }
        return response.status(500).json({ success: false, error: "Internal Server Error" })
    }

}