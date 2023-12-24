import Joi from "joi";

const joiMovieSchema = Joi.object({
    movieId: Joi.string().required(),
    img: Joi.string().required(),
    title: Joi.string().required(),
});

const joiFavoriteSchema = Joi.object({
    userId: Joi.string().required(),
    favoriteName: Joi.string().min(3).max(20).required(),
    movies: Joi.array().items(joiMovieSchema).required(),
});


export default joiFavoriteSchema
