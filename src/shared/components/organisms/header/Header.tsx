import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { ThemeToggle } from "../../atoms";
import { useAuthStore } from "@/core/store/authStore";
import { useNavigate } from "react-router-dom";
import { BsFillDice5Fill } from "react-icons/bs";
import { ROUTES } from "@/core/router/routes";

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <button
        className="btn btn-ghost"
        onClick={() => (window.location.href = "/")}
      >
        <img
          src="https://assets.pokemon.com/assets/cms2-es-xl/img/misc/gus/buttons/logo-pokemon-79x45.png"
          alt="Logo"
          className="w-24 h-10"
        />
      </button>
      <div className="flex items-center gap-4">
        <div
          className={`badge ${isAuthenticated ? "badge-info" : "badge-danger"}`}
        >
          {isAuthenticated ? "Logueado" : "No logueado"}
        </div>
        <ThemeToggle />
        {isAuthenticated ? (
          <>
            <button
              onClick={() => navigate(ROUTES.MY_POKEMONS)}
              className="btn btn-circle btn-outline btn-primary tooltip tooltip-left"
              data-tip="Mis Pokémon"
            >
              <BsFillDice5Fill size={24} />
            </button>

            <button
              onClick={logout}
              className="btn btn-ghost"
              aria-label="Cerrar sesión"
            >
              <FaSignOutAlt size={20} />
            </button>
          </>
        ) : (
          <button
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={redirectToLogin}
          >
            <FaSignInAlt size={20} /> Iniciar sesión
          </button>
        )}
      </div>
    </header>
  );
};
