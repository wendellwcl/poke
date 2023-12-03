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
    pokemon: IPokemon | null;
    handleStart: () => void;
    handleGuessPokemon: (guess: string) => void;
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

    const handleGuessPokemon = (guess: string) => {
        const result = pokemon!.name === guess ? true : false;

        if (result) {
            document.querySelector("#pokemon-display")!.classList.add("show");
            (
                document.querySelector("#draw-anohter-btn") as HTMLButtonElement
            ).focus();
        } else {
            const wrongAnswerEvent = new Event("wrongAnswer");
            window.dispatchEvent(wrongAnswerEvent);
        }
    };

    //1. Fetch Generations Data
    useEffect(() => {
        fetchGenerations(handleSetLoading, handleSetGenerationsList);
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
