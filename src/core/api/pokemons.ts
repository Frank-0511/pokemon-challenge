import { getPokemonsAdapter } from "../adapters";
import { GetPokemonApiResponse, GetPokemonInfoApiResponse } from "../types";
import axiosInstance from "./axiosInstance";

export const fetchListPokemons = async () => {
  const response = await axiosInstance.get<GetPokemonApiResponse>("/", {
    params: {
      results: 2000,
      page: 1,
      inc: "name,email,picture,gender,phone,cell,id",
    },
  });
  return getPokemonsAdapter(response.data);
};

export const fetchPokemon = async (id: string) => {
  const response = await axiosInstance.get<GetPokemonInfoApiResponse>(`/${id}`);
  return response.data;
};
