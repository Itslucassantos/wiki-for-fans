import { CharacterProps } from "./character.types";

export interface TvShowProps {
  id: number;
  name: string;
  originalName: string;
  overview: string;
  posterImage?: string | null;
  backdropImage?: string | null;
  firstAirDate: string;
  voteAverage: number;
  voteCount: number;
  numberOfSeasons: number;
  numberOfEpisodes: number;
  status: string;
  genres: { id: number; name: string }[];
  characters: CharacterProps[];
}
