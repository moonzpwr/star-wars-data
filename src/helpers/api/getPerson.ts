import { Person } from "../../interfaces/Person";
import { PersonResponseData } from "../../interfaces/PersonResponseData";
import httpCliet from "./api";

export const getPerson = (personId: number): Promise<Person> =>
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
