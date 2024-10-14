// /src/components/Row.tsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import Slider from "react-slick";
import "./Row.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface RowProps {
  title: string;
  fetchUrl: string;
}

const Row: React.FC<RowProps> = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchMovies();
  }, [fetchUrl]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // 한 번에 5개씩 보여줌
    slidesToScroll: 5, // 한 번에 5개씩 넘김
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row__poster"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Row;
