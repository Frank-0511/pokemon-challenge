import { CardPokemon } from "../card-pokemon";
import { Pokemon } from "@/core/types";

interface PokemonListProps {
  pokemons: Pokemon[];
}

export const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6">
      {pokemons.map((pokemon) => (
        <CardPokemon key={`card-${pokemon.name}`} pokemon={pokemon} />
      ))}
    </div>
  );
};
