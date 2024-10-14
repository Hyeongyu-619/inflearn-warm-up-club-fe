import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieRow from "../components/MovieRow";
import Banner from "../components/Banner"; // 배너 추가
import "./styles/MainPage.css";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchTrendingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

const fetchActionMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`
  );
  const data = await response.json();
  return data.results;
};

const MainPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trending = await fetchTrendingMovies();
        setTrendingMovies(trending);

        const topRated = await fetchTopRatedMovies();
        setTopRatedMovies(topRated);

        const action = await fetchActionMovies();
        setActionMovies(action);
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (query: string) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    setSearchResults(data.results);
  };

  return (
    <div className="main-page">
      <Banner /> {/* 배너 추가 */}
      <SearchBar onSearch={handleSearch} />
      {searchResults.length > 0 && (
        <MovieRow title="검색 결과" movies={searchResults} />
      )}
      <MovieRow title="Trending Now" movies={trendingMovies || []} />
      <MovieRow title="Top Rated" movies={topRatedMovies || []} />
      <MovieRow title="Action Movies" movies={actionMovies || []} />
    </div>
  );
};

export default MainPage;
