import { useEffect } from "react";
import { PokemonList, PokemonListSkeleton } from "../../components";
import { useListPokemons } from "@/core/hooks/useListPokemons";

const HomePage = () => {
  const { listPokemons, isLoading, fetchPokemons } = useListPokemons(false);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return (
    <section className="flex flex-col w-full gap-6">
      <div className="px-6 flex w-full justify-between">
        <article className="prose">
          <h1 className="text-2xl md:text-4xl">Pokemones</h1>
        </article>
      </div>
      {isLoading ? (
        <PokemonListSkeleton count={20} />
      ) : (
        <PokemonList pokemons={listPokemons} />
      )}
    </section>
  );
};

export default HomePage;
