import { Router } from "express";
import { TvShowController } from "./controllers/tvshow/TvShowController";
import { MovieController } from "./controllers/movie/MovieController";
import { RemoveMovieController } from "./controllers/movie/RemoveMovieController";
import { RemoveTvShowController } from "./controllers/tvshow/RemoveTvShowController";
import { SaveFavoriteMovieController } from "./controllers/movie/SaveFavoriteMovieController";
import { checksIfTheMovieExists } from "./middlewares/movie/checksIfTheMovieExists";
import { checksIfTheTvShowExists } from "./middlewares/tvShow/checksIfTheTvShowExists";
import { SaveFavoriteTvShowController } from "./controllers/tvshow/SaveFavoriteTvShowController";
import { SearchAllFavoritesTvShowController } from "./controllers/tvshow/SearchAllFavoritesTvShowController";
import { SearchAllFavoriteMoviesController } from "./controllers/movie/SearchAllFavoriteMoviesController";
import { SearchAllMoviesController } from "./controllers/movie/SearchAllMoviesController";
import { SearchAllTvShowsController } from "./controllers/tvshow/SearchAllTvShowsController";
import { SearchMovieByIdController } from "./controllers/movie/SearchMovieByIdController";
import { SearchTvShowByIdController } from "./controllers/tvshow/SearchTvShowByIdController";

const router = Router();

router.post("/tvshow", new TvShowController().handle);
router.post("/tvshow/favorite", checksIfTheTvShowExists, new SaveFavoriteTvShowController().handle);
router.delete("/tvshow/remove", checksIfTheTvShowExists, new RemoveTvShowController().handle);
router.get("/tvshow/searchAllFavorites", new SearchAllFavoritesTvShowController().handle);
router.get("/tvshow/searchAllTvShows", new SearchAllTvShowsController().handle);
router.get("/tvshow/searchTvShowById", new SearchTvShowByIdController().handle);

router.post("/movie", new MovieController().handle);
router.post("/movie/favorite", checksIfTheMovieExists, new SaveFavoriteMovieController().handle);
router.delete("/movie/remove", checksIfTheMovieExists, new RemoveMovieController().handle);
router.get("/movie/searchAllFavorites", new SearchAllFavoriteMoviesController().handle);
router.get("/movie/searchAllMovies", new SearchAllMoviesController().handle);
router.get("/movie/searchMovieById", new SearchMovieByIdController().handle);

export { router };
