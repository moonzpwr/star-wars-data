import { RawPerson, PersonResponseData } from "../../interfaces/Person";
import httpCliet from "./api";

export const getPerson = (personId: number): Promise<RawPerson> =>
  httpCliet.get<PersonResponseData>(`people/${personId}`).then(({ data }) => {
    const { hair_color, skin_color, eye_color, birth_year } = data;
    return {
      ...data,
      hairColor: hair_color,
      skinColor: skin_color,
      eyeColor: eye_color,
      birthYear: birth_year,
    };
  });
