import { Film } from "./Film";
import { Starship } from "./Starship";

export interface RawPerson {
  id: number;
  name: string;
  height: number;
  mass: number;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  homeworld: number;
  films: number[];
  starships: number[];
}

export interface PersonResponseData {
  id: number;
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: number;
  films: number[];
  species: number[];
  vehicles: number[];
  starships: number[];
  created: string;
  edited: string;
  url: string;
}

export interface Person extends Omit<RawPerson, "films" | "starships"> {
  films: Film[];
  starships: Starship[];
}
