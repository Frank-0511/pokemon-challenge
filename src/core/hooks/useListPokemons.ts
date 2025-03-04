import { toast } from "sonner";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToastColors } from "./useToastColors";
import { fetchListPokemons } from "../api";

export const useListPokemons = (autoFetch = true) => {
  const { getToastForType } = useToastColors();

  const pokemonsQuery = useQuery({
    queryKey: ["list-pokemons"],
    queryFn: () => fetchListPokemons(),
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
    fetchPokemons: pokemonsQuery.refetch,
    listPokemons: pokemonsQuery.data?.data ?? [],
    isLoading: pokemonsQuery.isLoading,
  };
};
