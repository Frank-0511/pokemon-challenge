import { GetPokemonApiResponse, GetPokemonResponse } from "../types";

const extractPokemonId = (url: string) => {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? match[1] : null;
};

export const getPokemonsAdapter = (
  response: GetPokemonApiResponse
): GetPokemonResponse => {
  return {
    ...response,
    data: response.results.map((pokemon) => {
      const pokemonId = extractPokemonId(pokemon.url);
      return {
        ...pokemon,
        urlImage: import.meta.env.VITE_API_IMAGE_URL + pokemonId + ".svg",
        id: Number(pokemonId),
      };
    }),
  };
};
