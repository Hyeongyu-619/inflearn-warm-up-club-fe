import axios, { AxiosResponse } from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = (endpoint: string): Promise<AxiosResponse<any>> => {
  return axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
};
