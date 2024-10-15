import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api/tmdb";
import "./styles/Banner.css";

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      const response = await fetchMovies(`/trending/all/week`);
      const randomMovie =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ];
      setMovie(randomMovie);
    };

    fetchBannerMovie();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="banner__description">{movie?.overview}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
