export interface IPokemon {
    id: number;
    name: string;
    sprites: { other: { "official-artwork": { front_default: string } } };
    types: [{ type: { name: string } }];
}

export interface IPokemonShort {
    name: string;
    url: string;
}

export interface IGeneration {
    name: string;
    url: string;
    species: IPokemonShort[];
    selected: boolean;
}
