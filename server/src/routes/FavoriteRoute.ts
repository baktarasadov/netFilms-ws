import { Router } from "express";
import express from 'express';
import { deleteFavorite, getAllFavorites, getFavorite, saveFavorite, updateFavorite } from "../controllers/favoriteController";
import { authMiddleware } from "../middlewares/authMiddleware";

const favoriteRoute: Router = express.Router();


const path: string = "/favorites"
favoriteRoute.get(`${path}/all`, authMiddleware, getAllFavorites);
favoriteRoute.post(`${path}/save`, authMiddleware, saveFavorite);
favoriteRoute.get(`${path}/get/`, authMiddleware, getFavorite);
favoriteRoute.delete(`${path}/delete/:id`, authMiddleware, deleteFavorite);
favoriteRoute.patch(`${path}/update/:id`, authMiddleware, updateFavorite);

export default favoriteRoute;