import mongoose, { Schema, Document } from 'mongoose';

export interface Favorite extends Document {
    userId: string;
    favoriteName: string;
    movies: { movieId: string; img: string; title: string }[];
}

const favoriteSchema: Schema<Favorite> = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    favoriteName: {
        type: String,
        required: true,
    },
    movies: [
        {
            movieId: {
                type: String,
                required: true,
            },
            img: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        },
    ],
});

export default mongoose.models.Favorite || mongoose.model<Favorite>('Favorite', favoriteSchema);
