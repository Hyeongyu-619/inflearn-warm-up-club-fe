import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchMovies } from "../api/tmdb";
import "./styles/MovieRow.css";
import "swiper/css";

interface MovieRowProps {
  title: string;
  movies: Array<any>;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (movieId: string) => {
    fetchMovies(`/movie/${movieId}`)
      .then((response) => {
        setSelectedMovie(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("영화 정보를 가져오는 중 오류 발생:", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <Swiper slidesPerView={5} spaceBetween={10} loop={true}>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="movie-card" onClick={() => handleClick(movie.id)}>
              <img
                className="movie-row__poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isModalOpen && selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
            />
            <p>{selectedMovie.overview}</p>
            <p>Release Date: {selectedMovie.release_date}</p>
            <p>Rating: {selectedMovie.vote_average}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRow;
