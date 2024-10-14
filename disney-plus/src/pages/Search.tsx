// /src/pages/Search.tsx
import React, { useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]); // Movie 타입 정의

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_TMDB_API_KEY&query=${e.target.value}`
      );
      setMovies(response.data.results);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleSearch}
      />
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
