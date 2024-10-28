import axios from "axios";
import { RawPerson } from "../interfaces/Person";
import { Film } from "../interfaces/Film";
import { Starship } from "../interfaces/Starship";

const httpCliet = axios.create({
  baseURL: "https://sw-api.starnavi.io/",
});

//all api calls
export const getPeople = (page: number): Promise<RawPerson[]> =>
  httpCliet
    .get<{ results: RawPerson[] }>(`people/?page=${page}`)
    .then(({ data }) => data.results);

export const getPerson = (personId: number): Promise<RawPerson> =>
  httpCliet.get<RawPerson>(`people/${personId}`).then(({ data }) => data);

export const getFilms = (ids: number[]): Promise<Film[]> =>
  httpCliet
    .get<{ results: Film[] }>(`films/?id__in=${ids.join(",")}`)
    .then(({ data }) => data.results);

export const getStarships = (ids: number[]): Promise<Starship[]> =>
  httpCliet
    .get<{ results: Starship[] }>(`starships/?id__in=${ids.join(",")}`)
    .then(({ data }) => data.results);
