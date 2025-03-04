import { Avatar } from "@/shared/components";
import { Pokemon } from "@/core/types";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useCapturedPokemonsStore } from "@/core/store";

interface CardPokemonProps {
  pokemon: Pokemon;
}

export const CardPokemon = ({ pokemon }: CardPokemonProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const email = useAuthStore((state) => state.user?.email);
  const hasCapturedPokemon = useCapturedPokemonsStore(
    (state) => state.hasCapturedPokemon
  );

  const isCaptured = email ? hasCapturedPokemon(email, pokemon.name) : false;

  const handleViewPokemon = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className="relative card card-pokemon shadow-xl hover:shadow-2xl hover:scale-[1.05] border-primary hover:border transition-all duration-300 ease-in-out">
      {isAuthenticated && isCaptured && (
        <span className="absolute top-2 left-2 bg-warning text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
          Capturado
        </span>
      )}

      <Avatar src={pokemon.urlImage} alt={pokemon.name} />
      <div className="card-body items-center text-center max-w-full w-full">
        <div className="w-full text-center">
          <h2 className="card-title capitalize text-xl whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full">
            {pokemon.name}
          </h2>
        </div>
        <div className="w-full flex justify-center">
          <button className="btn btn-primary" onClick={handleViewPokemon}>
            Ver Pokemon
          </button>
        </div>
      </div>
    </div>
  );
};
