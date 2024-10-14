// /src/utils/axiosConfig.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // TMDB API 기본 URL 설정
});

export default instance;
