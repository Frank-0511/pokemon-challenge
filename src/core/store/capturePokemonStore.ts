import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CapturedPokemonsState } from "../types";

export const useCapturedPokemonsStore = create(
  persist<CapturedPokemonsState>(
    (set, get) => ({
      capturedPokemons: {},
      capturePokemon: (email, pokemon) =>
        set((state) => ({
          capturedPokemons: {
            ...state.capturedPokemons,
            [email]: [...(state.capturedPokemons[email] || []), pokemon],
          },
        })),
      hasCapturedPokemon: (email, pokemonName) =>
        (get().capturedPokemons[email] || []).find(
          (pokemon) => pokemon.name === pokemonName
        ) !== undefined,

      getCapturedPokemons: (email) => get().capturedPokemons[email] || [],
    }),
    { name: "captured-pokemons" }
  )
);
