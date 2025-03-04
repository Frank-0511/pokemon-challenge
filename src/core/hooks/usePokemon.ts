import { toast } from "sonner";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToastColors } from "./useToastColors";
import { fetchPokemon } from "../api";

export const usePokemon = (id?: string) => {
  const { getToastForType } = useToastColors();

  const pokemonQuery = useQuery({
    queryKey: ["pokemon"],
    queryFn: () => {
      if (id) return fetchPokemon(id);
    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });

  useEffect(() => {
    if (pokemonQuery.isError) {
      toast.error("Error al obtener información", {
        description: (pokemonQuery.error as Error).message,
        style: getToastForType("error"),
      });
    }
  }, [pokemonQuery.isError, pokemonQuery.error, getToastForType]);

  return {
    fetchPokemon: pokemonQuery.refetch,
    pokemon: pokemonQuery.data ?? undefined,
    isLoading: pokemonQuery.isLoading,
  };
};
