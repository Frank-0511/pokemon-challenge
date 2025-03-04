import { usePokemon } from "@/core/hooks";
import { useAuthStore, useCapturedPokemonsStore } from "@/core/store";
import { PokemonInfo } from "@/core/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonPage = () => {
  const { id } = useParams<{ id: string }>();

  const [pokemon, setPokemon] = useState<PokemonInfo | undefined>(undefined);
  const [captured, setCaptured] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const email = useAuthStore((state) => state.user?.email);
  const capturePokemon = useCapturedPokemonsStore(
    (state) => state.capturePokemon
  );

  const hasCapturedPokemon = useCapturedPokemonsStore(
    (state) => state.hasCapturedPokemon
  );

  const { fetchPokemon, isLoading } = usePokemon(id);

  const fetchPokemonApi = async () => {
    const pokemonResponse = await fetchPokemon();
    setPokemon(pokemonResponse.data);
    if (email && pokemonResponse.data)
      setCaptured(hasCapturedPokemon(email, pokemonResponse.data.name));
  };

  useEffect(() => {
    fetchPokemonApi();
  }, [id]);

  const handleCapturePokemon = () => {
    if (email && pokemon) {
      capturePokemon(email, {
        name: pokemon.name,
        urlImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
        id: pokemon.id,
      });
      setCaptured(true);
    }
  };

  if (!pokemon || isLoading)
    return (
      <div className="flex justify-center items-center flex-grow">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <section className="flex flex-col flex-grow gap-6">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold capitalize">{pokemon.name}</h1>
        <p className="text-lg text-gray-500">ID: {pokemon.id}</p>
      </header>

      <div className="rounded-lg p-8">
        <div className="flex flex-col items-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="w-60 h-60 mb-4"
          />
          <div className="flex gap-3">
            {pokemon.types.map((t: any) => (
              <span
                key={t.type.name}
                className="badge badge-primary capitalize px-3 py-1"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Habilidades</h2>
          <ul className="space-y-2">
            {pokemon.abilities.map((a: any) => (
              <li key={a.ability.name} className="capitalize">
                {a.ability.name}{" "}
                {a.is_hidden && (
                  <span className="badge badge-secondary ml-2">Oculta</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Estadísticas</h2>
          <div className="grid grid-cols-2 gap-4">
            {pokemon.stats.map((s: any) => (
              <div
                key={s.stat.name}
                className="capitalize flex justify-between border-b py-2"
              >
                <span>{s.stat.name}</span>
                <span className="font-bold">{s.base_stat}</span>
              </div>
            ))}
          </div>
        </section>

        {isAuthenticated && email && (
          <div className="mt-8 text-center">
            {captured ? (
              <span className="badge badge-success p-4 rounded-lg text-lg">
                Capturado
              </span>
            ) : (
              <button
                className="btn btn-primary btn-lg text-lg"
                onClick={() => handleCapturePokemon()}
              >
                Capturar
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PokemonPage;
