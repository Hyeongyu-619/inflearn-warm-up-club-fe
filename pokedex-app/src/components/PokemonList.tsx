import React, { useEffect, useState } from "react";
import { fetchPokemons, fetchPokemonSpecies } from "../api/pokeApi";
import PokemonCard from "./PokemonCard";
import { CSSProperties } from "react";

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);
  const [offset, setOffset] = useState(40); // 첫 로드는 40개로 시작, 이후 41번부터 불러오기 위해 40으로 설정
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 첫 로드에서 1~40번 포켓몬 불러오기
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemons(40, 0); // 첫 40개 포켓몬을 0부터 불러옴

        const updatedPokemons = await Promise.all(
          data.results.map(async (pokemon: any, index: number) => {
            const pokemonId = index + 1;
            const speciesData = await fetchPokemonSpecies(pokemonId);
            return {
              ...pokemon,
              id: pokemonId,
              color: speciesData.color.name,
            };
          })
        );

        setPokemons(updatedPokemons); // 초기 포켓몬 40개 설정
        setFilteredPokemons(updatedPokemons); // 검색을 위한 필터링 리스트 초기화
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    initialLoad(); // 초기 40개 로드
  }, []);

  // 추가로 포켓몬 불러오기 (41번부터 시작)
  const loadMorePokemons = async () => {
    setLoading(true);
    try {
      const data = await fetchPokemons(40, offset); // 오프셋에 따라 40개씩 추가로 불러옴

      const updatedPokemons = await Promise.all(
        data.results.map(async (pokemon: any, index: number) => {
          const pokemonId = offset + index + 1; // 41번부터 시작하도록 ID 계산
          const speciesData = await fetchPokemonSpecies(pokemonId);
          return {
            ...pokemon,
            id: pokemonId,
            color: speciesData.color.name,
          };
        })
      );

      setPokemons((prevPokemons) => [...prevPokemons, ...updatedPokemons]); // 기존 포켓몬에 추가

      setFilteredPokemons((prevPokemons) => [
        ...prevPokemons,
        ...updatedPokemons,
      ]); // 필터링 리스트도 업데이트

      setOffset((prevOffset) => prevOffset + 40); // 오프셋을 업데이트하여 다음에 불러올 포켓몬 위치 조정
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 검색 필터링 함수
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPokemons(
      pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(query))
    );
  };

  const getPokemonColor = (colorName: string) => {
    switch (colorName) {
      case "red":
        return "#F08030";
      case "blue":
        return "#6890F0";
      case "green":
        return "#78C850";
      case "yellow":
        return "#F8D030";
      case "brown":
        return "#A52A2A";
      case "purple":
        return "#A040A0";
      case "pink":
        return "#EE99AC";
      case "gray":
        return "#B8B8D0";
      case "white":
        return "#F5F5F5";
      case "black":
        return "#705848";
      default:
        return "#A8A878";
    }
  };

  if (loading && pokemons.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchQuery}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      <div className="pokemon-list" style={styles.grid}>
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            color={getPokemonColor(pokemon.color)}
          />
        ))}
      </div>
      <button
        onClick={loadMorePokemons}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    textAlign: "center",
    paddingTop: "120px", // 헤더 높이만큼 여백 추가 (고정된 헤더의 높이 포함)
    padding: "20px",
  },
  searchInput: {
    padding: "10px",
    fontSize: "18px",
    width: "50%",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "2px solid #ccc",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default PokemonList;
