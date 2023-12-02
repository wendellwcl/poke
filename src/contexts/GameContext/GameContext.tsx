import { createContext, useState, useEffect } from "react";

//Interfaces
import { IGeneration } from "../../Interfaces/interfaces";

//Functions
import fetchGenerations from "./functions/FetchGenerations";

interface Props {
    children: React.ReactNode;
}

interface IGameContextValue {
    generationsList: IGeneration[];
    loading: boolean;
}

export const GameContetx = createContext<IGameContextValue>({
    generationsList: [],
    loading: true,
});

const GameContextProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [generationsList, setGenerationsList] = useState<IGeneration[]>([]);

    const handleSetLoading = (value: boolean) => {
        setLoading(value);
    };

    const handleSetGenerationsList = (value: IGeneration[]) => {
        setGenerationsList(value);
    };

    useEffect(() => {
        //1. Fetch Generations Data
        fetchGenerations(handleSetLoading, handleSetGenerationsList);
    }, []);

    const contextValue = {
        generationsList,
        loading,
    };

    return (
        <GameContetx.Provider value={contextValue}>
            {children}
        </GameContetx.Provider>
    );
};

export default GameContextProvider;
