import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovies } from "../api/tmdb";
import "./styles/MovieDetailPage.css";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (id) {
        const response = await fetchMovies(`/movie/${id}`);
        setMovie(response.data);
      }
    };

    getMovieDetails();
  }, [id]);

  return (
    <div className="movie-detail-page">
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.overview}</p>
          <span>평점: {movie.vote_average}</span>
        </>
      )}
    </div>
  );
};

export default MovieDetailPage;
