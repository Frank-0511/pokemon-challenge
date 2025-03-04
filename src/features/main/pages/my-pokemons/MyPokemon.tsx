import { useAuthStore, useCapturedPokemonsStore } from "@/core/store";
import { useNavigate } from "react-router-dom";

const MyPokemonsPage = () => {
  const navigate = useNavigate();
  const email = useAuthStore((state) => state.user?.email);
  const capturedPokemons = useCapturedPokemonsStore((state) =>
    email ? state.getCapturedPokemons(email) : []
  );

  const handleViewPokemon = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        Pokemones Capturados
      </h1>

      {capturedPokemons.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No has capturado ningún Pokémon aún. ¡Atrapa algunos!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {capturedPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="card shadow-lg border rounded-lg p-4 text-center"
            >
              <img
                src={pokemon.urlImage}
                alt={pokemon.name}
                className="w-32 h-32 mx-auto"
              />
              <h2 className="capitalize text-xl font-semibold mt-2">
                {pokemon.name}
              </h2>
              <button
                className="btn btn-primary mt-3"
                onClick={() => handleViewPokemon(pokemon.id)}
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyPokemonsPage;
