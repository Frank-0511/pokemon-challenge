import { toast } from "sonner";
import { useEffect } from "react";
import { useToastColors } from "./useToastColors";
import { fetchListPokemons } from "../api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useListPokemons = (autoFetch = true) => {
  const { getToastForType } = useToastColors();

  const pokemonsQuery = useInfiniteQuery({
    queryKey: ["list-pokemons"],
    queryFn: ({ pageParam = 1 }) => fetchListPokemons(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const offset = url.searchParams.get("offset");
        return offset ? parseInt(offset) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: autoFetch,
  });

  useEffect(() => {
    if (pokemonsQuery.isError) {
      toast.error("Error al obtener a los pokemones", {
        description: (pokemonsQuery.error as Error).message,
        style: getToastForType("error"),
      });
    }
  }, [pokemonsQuery.isError, pokemonsQuery.error, getToastForType]);

  return {
    fetchNextPage: pokemonsQuery.fetchNextPage,
    hasNextPage: pokemonsQuery.hasNextPage,
    isFetchingNextPage: pokemonsQuery.isFetchingNextPage,
    listPokemons: pokemonsQuery.data?.pages.flatMap((page) => page.data) ?? [],
    isLoading: pokemonsQuery.isLoading,
  };
};
