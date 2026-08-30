import { ImageUrlBuilder } from "../../utils/ImageUrlBuilder";
import api from "../../http/api";

interface CharacterDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  popularity: number;
  gender: number;
  known_for_department: string;
  also_known_as: string[];
  homepage: string | null;
  imdb_id: string;
}

interface CharacterReq {
  id: number;
  character: string;
}

class CharacterDetailsTmdbService {
  private readonly tmdbApiKey = process.env.TMDB_API_KEY;

  async execute(character: CharacterReq) {
    const searchForActor = await api.get<CharacterDetails>(`/person/${character.id}`, {
      params: { api_key: this.tmdbApiKey, language: "en-US" },
    });

    const actorDetails = searchForActor.data;

    return {
      id: character.id,
      characterName: character.character,
      actorId: actorDetails.id,
      actorName: actorDetails.name,
      actorBiography: actorDetails.biography || "",
      actorBirthday: actorDetails.birthday,
      actorDeathday: actorDetails.deathday,
      actorAge: this.calculateActorAge(actorDetails.birthday, actorDetails.deathday),
      actorPlaceOfBirth: actorDetails.place_of_birth,
      actorProfileImage: ImageUrlBuilder.build(actorDetails.profile_path),
      actorPopularity: actorDetails.popularity,
      actorGender: this.mapGender(actorDetails.gender),
      actorKnownFor: actorDetails.known_for_department,
      actorAlsoKnownAs: actorDetails.also_known_as,
      actorHomepage: actorDetails.homepage,
      actorImdbId: actorDetails.imdb_id,
    };
  }

  private calculateActorAge(birthday: string | null, deathday: string | null): number | null {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    let age = endDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = endDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birthDate.getDate())) age--;
    return age;
  }

  private mapGender(genderCode: number): "Unknown" | "Female" | "Male" | "Non-binary" {
    const genderMap: Record<number, "Unknown" | "Female" | "Male" | "Non-binary"> = {
      0: "Unknown",
      1: "Female",
      2: "Male",
      3: "Non-binary",
    };

    return genderMap[genderCode] || "Unknown";
  }
}

export { CharacterDetailsTmdbService };
