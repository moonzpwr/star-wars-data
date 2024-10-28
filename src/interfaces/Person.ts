import { Film } from "./Film";
import { Starship } from "./Starship";

export interface RawPerson {
  id: number;
  name: string;
  films: number[];
  starships: number[];
}

export interface Person extends Omit<RawPerson, "films" | "starships"> {
  films: Film[];
  starships: Starship[];
}
