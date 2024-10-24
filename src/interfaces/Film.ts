export interface Film {
  id: number;
  title: string;
  openingCrawl: string;
  director: string;
  releaseDate: string;
}

export interface FilmResponseData {
  id: number;
  title: string;
  opening_crawl: string;
  director: string;
  release_date: string;
}
