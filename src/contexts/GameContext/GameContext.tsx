import { createContext, useState, useEffect } from "react";

//Interfaces
import { IGeneration, IPokemon } from "../../Interfaces/interfaces";

//Functions
import fetchGenerations from "./functions/fetchGenerations";
import start from "./functions/start";

interface Props {
    children: React.ReactNode;
}

interface IGameContextValue {
    generationsList: IGeneration[];
    loading: boolean;
    handleStart: () => void;
    pokemon: IPokemon | null;
}

export const GameContetx = createContext<IGameContextValue>({
    generationsList: [],
    loading: true,
    handleStart: () => {},
    pokemon: null,
});

const GameContextProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [generationsList, setGenerationsList] = useState<IGeneration[]>([]);
    const [pokemon, setPokemon] = useState<IPokemon | null>(null);

    const handleSetLoading = (value: boolean) => {
        setLoading(value);
    };

    const handleSetGenerationsList = (value: IGeneration[]) => {
        setGenerationsList(value);
    };

    const handleStart = async () => {
        setLoading(true);

        const gameData = await start(generationsList, handleStart);

        setPokemon(gameData);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        //1. Fetch Generations Data
        fetchGenerations(handleSetLoading, handleSetGenerationsList);
    }, []);

    const contextValue: IGameContextValue = {
        generationsList,
        loading,
        handleStart,
        pokemon,
    };

    return (
        <GameContetx.Provider value={contextValue}>
            {children}
        </GameContetx.Provider>
    );
};

export default GameContextProvider;
