//This Context is responsible for fetch the complete list with names of all Pokémon

import { createContext, useState, useEffect } from "react";

//Interfaces
import { IPokemonShort } from "../Interfaces/interfaces";

interface Props {
    children: React.ReactNode;
}

interface IPokemonListContextValue {
    pokemonList: IPokemonShort[];
}

export const PokemonListContext = createContext<IPokemonListContextValue>({
    pokemonList: [],
});

const PokemonListContextProvider = ({ children }: Props) => {
    const [pokemonList, setPokemonList] = useState<IPokemonShort[]>([]);

    //Fetch list of Pokémon names
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemoon/?limit=10000&offset=0")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw "Error fetching Pokémon name list";
                }
            })
            .then((res) => setPokemonList(res.results))
            .catch((e) => {
                throw new Error(e);
            });
    }, []);

    const contextValue = {
        pokemonList,
    };

    return (
        <PokemonListContext.Provider value={contextValue}>
            {children}
        </PokemonListContext.Provider>
    );
};

export default PokemonListContextProvider;
