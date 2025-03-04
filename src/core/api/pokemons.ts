import { getPokemonsAdapter } from "../adapters";
import { GetPokemonApiResponse, GetPokemonInfoApiResponse } from "../types";
import axiosInstance from "./axiosInstance";

export const fetchListPokemons = async (offset = 1) => {
  const response = await axiosInstance.get<GetPokemonApiResponse>("/", {
    params: {
      limit: 20,
      offset,
    },
  });
  return getPokemonsAdapter(response.data);
};

export const fetchPokemon = async (id: string) => {
  const response = await axiosInstance.get<GetPokemonInfoApiResponse>(`/${id}`);
  return response.data;
};
