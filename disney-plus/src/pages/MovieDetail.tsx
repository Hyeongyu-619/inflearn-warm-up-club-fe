// /src/pages/MovieDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null); // Movie 타입 정의

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_TMDB_API_KEY`
      );
      setMovie(response.data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
};

export default MovieDetail;
