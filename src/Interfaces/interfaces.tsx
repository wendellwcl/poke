export interface IPokemon {
    id: number;
    name: string;
    sprites: { other: { "official-artwork": { front_default: string } } };
}

export interface IPokemonShort {
    name: string;
    url: string;
}
