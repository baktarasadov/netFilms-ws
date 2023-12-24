import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./utils/connect"
import swaggerUi from "swagger-ui-express"
import favoriteRoute from "./routes/FavoriteRoute";
import { specs } from "./config/swaggerConfig";
import authRoute from "./routes/authRoute";
import cookieParser from 'cookie-parser';
dotenv.config();
connect();

const app: Express = express();
const port: string | undefined = process.env.APP_PORT

const basePath = "/api/v1"

app.use(express.json({ limit: '10mb' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cookieParser());

app.use(basePath, favoriteRoute);
app.use(basePath, authRoute);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


