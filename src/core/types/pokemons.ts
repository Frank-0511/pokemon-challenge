export interface PokemonApi {
  name: string;
  url: string;
}

export interface GetPokemonApiResponse {
  results: PokemonApi[];
  count: number;
  next: string;
  previous: string;
}

export interface Pokemon {
  name: string;
  url: string;
  urlImage: string;
  id: number;
}

export interface GetPokemonResponse {
  data: Pokemon[];
  count: number;
  next: string;
  previous: string;
}

export interface PokemonInfo {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;

  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];

  species: {
    name: string;
    url: string;
  };

  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  held_items: any[];
  past_abilities: any[];
  past_types: any[];
}

export type GetPokemonInfoApiResponse = PokemonInfo;

export interface PokemonCaptured {
  name: string;
  urlImage: string;
  id: number;
}

export interface CapturedPokemonsState {
  capturedPokemons: Record<string, PokemonCaptured[]>;
  capturePokemon: (email: string, pokemon: PokemonCaptured) => void;
  getCapturedPokemons: (email: string) => PokemonCaptured[];
  hasCapturedPokemon: (email: string, pokemonName: string) => boolean;
}
