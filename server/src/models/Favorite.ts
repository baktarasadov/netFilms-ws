import mongoose from "mongoose";
import { Schema, Document } from 'mongoose';

export interface Favorite extends Document {
    favoriteName: String;
    movies: { moveId: string; img: string, title: string }[];
}

const favoriteSchema: Schema<Favorite> = new mongoose.Schema({
    favoriteName: {
        type: String,
        required: true,
        unique: true
    },
    movies: [
        {
            moveId: {
                type: String,
                required: true,
                unique: true
            },
            img: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }
    ]
})

export default mongoose.models.Todo || mongoose.model<Favorite>('Favorite', favoriteSchema);