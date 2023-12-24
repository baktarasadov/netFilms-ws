import mongoose, { Schema, Document } from 'mongoose';

export interface Auth extends Document {
    fullname: string;
    email: string;
    password: string;
}

const authSchema: Schema<Auth> = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

export default mongoose.models.Auth || mongoose.model<Auth>('Auth', authSchema);
