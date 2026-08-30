import { Request, Response } from "express";
import { SearchAllFavoriteTvShowsService } from "../../services/internal/tvShow/SearchAllFavoriteTvShowsService";

class SearchAllFavoritesTvShowController {
  async handle(_: Request, res: Response) {
    const searchAllFavoriteTvShowsService = new SearchAllFavoriteTvShowsService();
    const tvShows = await searchAllFavoriteTvShowsService.execute();

    return res.json(tvShows);
  }
}

export { SearchAllFavoritesTvShowController };
