//This Context is responsible for centralizing all features related to how the game works

import { createContext, useState, useEffect } from "react";

//Interfaces
import { IGeneration, IPokemon } from "../../Interfaces/interfaces";

//Functions
import fetchGenerationsList from "./functions/fetchGenerationsList.tsx";
import start from "./functions/start";
import guessPokemon from "./functions/guessPokemon.tsx";

interface Props {
    children: React.ReactNode;
}

interface IGameContextValue {
    generationsList: IGeneration[];
    loading: boolean;
    pokemon: IPokemon | null;
    handleStart: () => void;
    handleGuessPokemon: (
        value: string,
        handleInputValue: React.Dispatch<React.SetStateAction<string>>
    ) => void;
}

export const GameContetx = createContext<IGameContextValue>({
    generationsList: [],
    loading: true,
    pokemon: null,
    handleStart: () => {},
    handleGuessPokemon: () => {},
});

const GameContextProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [generationsList, setGenerationsList] = useState<IGeneration[]>([]);
    const [pokemon, setPokemon] = useState<IPokemon | null>(null);

    //Function to handle with 'loading' state
    const handleSetLoading = (value: boolean) => {
        setLoading(value);
    };

    //Function to handle with 'generationsList' state
    const handleSetGenerationsList = (value: IGeneration[]) => {
        setGenerationsList(value);
    };

    //Function to handle with 'generationsList' state
    const handleSetPokemon = (value: IPokemon) => {
        setPokemon(value);
    };

    //Function to start the game
    const handleStart = () => {
        start(generationsList, handleSetLoading, handleSetPokemon, handleStart);
    };

    //Function to handle with a guess, check if the player answer is correct
    const handleGuessPokemon = (
        playerAnswer: string,
        handleInputValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
        guessPokemon(pokemon!.name, playerAnswer, handleInputValue);
    };

    //Fetch generations list
    useEffect(() => {
        fetchGenerationsList(handleSetLoading, handleSetGenerationsList);
    }, []);

    const contextValue: IGameContextValue = {
        generationsList,
        loading,
        pokemon,
        handleStart,
        handleGuessPokemon,
    };

    return (
        <GameContetx.Provider value={contextValue}>
            {children}
        </GameContetx.Provider>
    );
};

export default GameContextProvider;
