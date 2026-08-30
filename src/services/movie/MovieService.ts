import { CharacterProps } from "../../types/character.types";
import { MovieResponse } from "../../types/movie.types";
import { NameMovieOrTvShow } from "../../types/tvShowAndMovie.types";
import { SaveCharacterService } from "../internal/character/SaveCharacterService";
import { SaveMovieService } from "../internal/movie/SaveMovieService";
import { SearchMovieService } from "../internal/movie/SearchMovieService";
import { CharacterDetailsTmdbService } from "../tmdb/CharacterDetailsTmdbService";
import { SearchCharactersTmdbService } from "../tmdb/SearchCharactersTmdbService";
import { SearchMovieDetailsTmdbService } from "../tmdb/SearchMovieDetailsTmdbService";
import { SearchMovieTmdbService } from "../tmdb/SearchMovieTmdbService";

class MovieService {
  private readonly searchMovieTmdbService = new SearchMovieTmdbService();
  private readonly searchMovieDetailsTmdbService = new SearchMovieDetailsTmdbService();
  private readonly searchCharactersTmdbService = new SearchCharactersTmdbService();
  private readonly characterDetailsTmdbService = new CharacterDetailsTmdbService();
  private readonly saveMovieService = new SaveMovieService();
  private readonly saveCharacterService = new SaveCharacterService();
  private readonly searchMovieService = new SearchMovieService();

  async execute(request: NameMovieOrTvShow): Promise<MovieResponse | void> {
    try {
      const { name } = request;

      const movieResponseOfInternalDb = await this.searchMovieService.execute({
        name,
      });

      if (movieResponseOfInternalDb) {
        return movieResponseOfInternalDb;
      }

      const movie = await this.searchMovieTmdbService.execute({ name });

      if (!movie) {
        throw new Error(`Movie "${name}" not found on TMDB`);
      }

      const movieDetails = await this.searchMovieDetailsTmdbService.execute({
        id: movie.id,
      });

      const characters = await this.searchCharactersTmdbService.execute({
        id: movie.id,
        type: "movie",
      });

      const savedMovie = await this.saveMovieService.execute(movieDetails);

      const detailedCharacters: CharacterProps[] = [];

      for (const c of characters) {
        const characterDetails = await this.characterDetailsTmdbService.execute(c);

        await this.saveCharacterService.execute(characterDetails, null, savedMovie.id);

        detailedCharacters.push(characterDetails);
      }

      return {
        ...movieDetails,
        characters: detailedCharacters,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      const err = new Error("Failed to fetch movie: " + message);
      if (error instanceof Error) {
        Object.assign(err, { cause: error });
      }
      throw err;
    }
  }
}

export { MovieService };
