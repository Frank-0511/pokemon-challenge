import { useEffect, useRef, useCallback } from "react";
import { PokemonList, PokemonListSkeleton } from "../../components";
import { useListPokemons } from "@/core/hooks/useListPokemons";

const HomePage = () => {
  const {
    listPokemons,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useListPokemons(true);

  const loadMoreRef = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver]);

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
        <>
          <PokemonList pokemons={listPokemons} />
          <div ref={loadMoreRef} className="h-10"></div>
        </>
      )}
      {isFetchingNextPage && <PokemonListSkeleton count={5} />}
    </section>
  );
};

export default HomePage;
