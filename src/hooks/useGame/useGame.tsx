import { useState, useEffect } from "react";

//Classes
import { Generation } from "../../classes/classes";

//Interfaces
import { IPokemon } from "../../Interfaces/interfaces";

//Functions
import getData from "./functions/getData";
import startGame from "./functions/startGame";
import guessPokemon from "./functions/guessPokemon";

const useGame = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [generations, setGenerations] = useState<Generation[]>([]);
    const [pokemon, setPokemon] = useState<IPokemon | null>(null);

    //Function to handle with 'loading' state
    const handleSetLoading = (value: boolean) => {
        setLoading(value);
    };

    //Function to handle with 'generations' state
    const handleSetGenerations = (value: Generation[]) => {
        setGenerations(value);
    };

    //Function to handle with 'generations' state
    const handleSetPokemon = (value: IPokemon) => {
        setPokemon(value);
    };

    //Function to start the game
    const handleStartGame = () => {
        startGame(
            generations,
            handleSetLoading,
            handleSetPokemon,
            handleStartGame
        );
    };

    //Function to handle with a guess, check if the player answer is correct
    const handleGuessPokemon = (
        playerAnswer: string,
        handleInputValue: (value: React.SetStateAction<string>) => void
    ) => {
        guessPokemon(pokemon!.name, playerAnswer, handleInputValue);
    };

    //Fetch data
    useEffect(() => {
        getData(handleSetLoading, handleSetGenerations);
    }, []);

    return {
        loading,
        generations,
        pokemon,
        handleStartGame,
        handleGuessPokemon,
    };
};

export default useGame;
