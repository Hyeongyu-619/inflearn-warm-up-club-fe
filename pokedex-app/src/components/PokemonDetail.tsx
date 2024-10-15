import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
  fetchPokemons,
} from "../api/pokeApi";
import { CSSProperties } from "react";
import RadarChart from "./RadarChart";

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);
  const [allPokemons, setAllPokemons] = useState<any[]>([]); // 전체 포켓몬 목록 저장
  const [typeRelations, setTypeRelations] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAttackMode, setIsAttackMode] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState<string>("#fff");
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) return;

    const loadPokemonDetails = async () => {
      setLoading(true);
      try {
        const pokemonData = await fetchPokemonDetails(name);
        const speciesData = await fetchPokemonSpecies(pokemonData.id);
        setPokemon(pokemonData);
        setSpecies(speciesData);

        const typeUrl = pokemonData.types[0].type.url;
        const typeResponse = await fetch(typeUrl);
        const typeData = await typeResponse.json();
        setTypeRelations(typeData.damage_relations);

        setBackgroundColor(getPokemonColor(speciesData.color.name));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const loadAllPokemons = async () => {
      const data = await fetchPokemons(1000, 0);
      setAllPokemons(data.results);
    };

    loadPokemonDetails();
    loadAllPokemons();
  }, [name]);

  const getPokemonColor = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      red: "#F08030",
      blue: "#6890F0",
      green: "#78C850",
      yellow: "#F8D030",
      brown: "#A52A2A",
      purple: "#A040A0",
      pink: "#EE99AC",
      gray: "#B8B8D0",
      white: "#F5F5F5",
      black: "#705848",
      default: "#A8A878",
    };
    return colorMap[colorName] || colorMap.default;
  };

  const typeColors: { [key: string]: string } = {
    grass: "#78C850",
    poison: "#A040A0",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    flying: "#A890F0",
    electric: "#F8D030",
    ground: "#E0C068",
    psychic: "#F85888",
    rock: "#B8A038",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  // 이전 포켓몬으로 이동
  const handlePreviousPokemon = () => {
    if (pokemon && pokemon.id > 1) {
      const previousPokemon = allPokemons[pokemon.id - 2]; // 이전 포켓몬
      if (previousPokemon) {
        navigate(`/pokemon/${previousPokemon.name}`);
      }
    }
  };

  // 다음 포켓몬으로 이동
  const handleNextPokemon = () => {
    if (pokemon && pokemon.id < allPokemons.length) {
      const nextPokemon = allPokemons[pokemon.id]; // 다음 포켓몬
      if (nextPokemon) {
        navigate(`/pokemon/${nextPokemon.name}`);
      }
    }
  };

  const renderTypeRelations = () => {
    if (!typeRelations) return null;
    const relations = isAttackMode
      ? typeRelations
      : {
          double_damage_from: typeRelations.double_damage_to,
          half_damage_from: typeRelations.half_damage_to,
          no_damage_from: typeRelations.no_damage_to,
        };

    return (
      <div style={styles.relationsBox}>
        <h3>
          {isAttackMode ? "Attack Effectiveness" : "Defense Effectiveness"}
        </h3>
        <p>
          <strong>2× Damage:</strong>{" "}
          {relations.double_damage_from.map((t: any) => t.name).join(", ") ||
            "None"}
        </p>
        <p>
          <strong>0.5× Damage:</strong>{" "}
          {relations.half_damage_from.map((t: any) => t.name).join(", ") ||
            "None"}
        </p>
        <p>
          <strong>No Damage:</strong>{" "}
          {relations.no_damage_from.map((t: any) => t.name).join(", ") ||
            "None"}
        </p>
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pokemon || !species) return <p>No Pokemon data found</p>;

  const { height, weight, types, stats } = pokemon;
  const statValues = stats.map((s: any) => s.base_stat);

  return (
    <div
      style={{
        ...styles.container,
        background: `linear-gradient(to bottom, ${backgroundColor} 30%, #fff 100%)`,
      }}
    >
      <button
        onClick={handlePreviousPokemon}
        style={{
          ...styles.arrowButton,
          visibility: pokemon?.id === 1 ? "hidden" : "visible",
          left: "0px",
        }}
      >
        {"<"}
      </button>

      <div style={styles.pokemonSection}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={name}
          style={styles.image}
        />
        <h1 style={styles.title}>{name?.toUpperCase()}</h1>
        <div style={styles.typeContainer}>
          {types.map((t: any, index: number) => (
            <span
              key={index}
              style={{
                ...styles.typeBox,
                backgroundColor: typeColors[t.type.name],
              }}
            >
              {t.type.name.toUpperCase()}
            </span>
          ))}
        </div>
        <div style={styles.statsBox}>
          <span style={styles.statItem}>Height: {height / 10}m</span>
          <span style={styles.statItem}>Weight: {weight / 10}kg</span>
        </div>
      </div>

      <div style={styles.chartSection}>
        <RadarChart stats={statValues} />
        <div style={styles.toggleButtons}>
          <button
            onClick={() => setIsAttackMode(true)}
            style={isAttackMode ? styles.activeButton : styles.button}
          >
            Attack
          </button>
          <button
            onClick={() => setIsAttackMode(false)}
            style={isAttackMode ? styles.button : styles.activeButton}
          >
            Defense
          </button>
        </div>
        {renderTypeRelations()}
      </div>

      <button
        onClick={handleNextPokemon}
        style={{ ...styles.arrowButton, right: "0px" }}
      >
        {">"}
      </button>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "75px",
    padding: "75px",
    minHeight: "100vh",
    position: "relative",
  },
  pokemonSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "450px",
    height: "450px",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
  },
  typeContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
  },
  typeBox: {
    padding: "15px 30px",
    borderRadius: "45px",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "1.2rem",
  },
  statsBox: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "15px",
  },
  statItem: {
    backgroundColor: "#f0f0f0",
    padding: "12px 30px",
    borderRadius: "30px",
    fontSize: "1.5rem",
  },
  chartSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "450px",
  },
  toggleButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
  },
  button: {
    padding: "15px 30px",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#f0f0f0",
    color: "#333",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  activeButton: {
    padding: "15px 30px",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#6890F0",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  relationsBox: {
    marginTop: "30px",
    backgroundColor: "#f0f0f0",
    padding: "15px 30px",
    borderRadius: "15px",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
    fontSize: "1.2rem",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    fontSize: "2rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "10px",
    zIndex: 1,
  },
};

export default PokemonDetail;
