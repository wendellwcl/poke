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

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0")
            .then((res) => res.json())
            .then((res) => setPokemonList(res.results));
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
