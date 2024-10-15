const API_BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = async (limit: number, offset: number) => {
  const response = await fetch(
    `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemons");
  }
  return response.json();
};

export const fetchPokemonDetails = async (name: string) => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for Pokemon: ${name}`);
  }
  return response.json();
};

export const fetchPokemonSpecies = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/pokemon-species/${id}`);
  return await response.json();
};
