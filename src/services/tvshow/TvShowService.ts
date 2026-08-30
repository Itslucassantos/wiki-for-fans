import { TvShowProps } from "../../types/tvshow.types";
import { CharacterDetailsTmdbService } from "../tmdb/CharacterDetailsTmdbService";
import { CharacterProps } from "../../types/character.types";
import { SearchTvShowService } from "../internal/tvShow/SearchTvShowService";
import { SearchTvShowTmdbService } from "../tmdb/SearchTvShowTmdbService";
import { SearchCharactersTmdbService } from "../tmdb/SearchCharactersTmdbService";
import { SearchTvShowDetailsTmdbService } from "../tmdb/SearchTvShowDetailsTmdbService";
import { SaveTvShowService } from "../internal/tvShow/SaveTvShowService";
import { SaveCharacterService } from "../internal/character/SaveCharacterService";
import { NameMovieOrTvShow } from "../../types/tvShowAndMovie.types";

class TvShowService {
  private readonly searchTvShowService = new SearchTvShowService();
  private readonly searchCharactersTmdbService = new SearchCharactersTmdbService();
  private readonly searchTvShowTmdbService = new SearchTvShowTmdbService();
  private readonly searchTvShowDetailsTmdbService = new SearchTvShowDetailsTmdbService();
  private readonly characterDetailsTmdbService = new CharacterDetailsTmdbService();
  private saveTvShowService = new SaveTvShowService();
  private saveCharacterService = new SaveCharacterService();

  async execute(request: NameMovieOrTvShow): Promise<TvShowProps | null> {
    try {
      const { name } = request;

      const tvShowResponseOfInternalDb = await this.searchTvShowService.execute({
        name,
      });

      if (tvShowResponseOfInternalDb) {
        return tvShowResponseOfInternalDb;
      }

      const tvShow = await this.searchTvShowTmdbService.execute({ name });

      if (!tvShow) {
        throw new Error(`TV show "${name}" not found on TMDB`);
      }

      const tvShowDetails = await this.searchTvShowDetailsTmdbService.execute({
        id: tvShow.id,
      });

      const characters = await this.searchCharactersTmdbService.execute({
        id: tvShow.id,
        type: "tv",
      });

      const savedTvShow = await this.saveTvShowService.execute(tvShowDetails);

      const detailedCharacters: CharacterProps[] = [];

      for (const c of characters) {
        const characterDetails = await this.characterDetailsTmdbService.execute(c);

        await this.saveCharacterService.execute(characterDetails, savedTvShow.id);

        detailedCharacters.push(characterDetails);
      }

      return {
        ...tvShowDetails,
        characters: detailedCharacters,
      };
    } catch (error: any) {
      throw new Error("Failed to fetch TV show: " + error.message);
    }
  }
}

export { TvShowService };
