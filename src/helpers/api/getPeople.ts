import { RawPerson, PersonResponseData } from "../../interfaces/Person";
import httpCliet from "./api";

export const getPeople = (page: number): Promise<RawPerson[]> =>
  httpCliet
    .get<{ results: PersonResponseData[] }>(`people/?page=${page}`)
    .then(({ data }) =>
      data.results.map((person) => {
        const { hair_color, skin_color, eye_color, birth_year } = person;
        return {
          ...person,
          hairColor: hair_color,
          skinColor: skin_color,
          eyeColor: eye_color,
          birthYear: birth_year,
        };
      })
    );
