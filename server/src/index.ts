import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./utils/connect"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import favoriteRoute from "./routes/FavoriteRoute";
import { specs } from "./config/swaggerConfig";
dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.APP_PORT

const basePath = "/v1"


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

connect();

app.use(basePath, favoriteRoute)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});