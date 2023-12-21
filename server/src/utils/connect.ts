import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URI: string | undefined = process.env.DB_URI;

const connect = () => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(DB_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        .then(() => console.log("connected to database"))
        .catch((err) => console.log(err));
};

export default connect;

