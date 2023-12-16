//Functions
import getSelectedGenerations from "./getSelectedGenerations";
import selectDefaultGeneration from "./selectDefaultGeneration";
import getSpecies from "./getSpecies";
import drawRandomSpecies from "./drawRandomSpecies";
import getSpecieData from "./getSpecieData";

//Classes
import { Generation } from "../../../classes/classes";

//Interfaces
import { IPokemon } from "../../../Interfaces/interfaces";

function startGame(
    generations: Generation[],
    handleSetLoading: (value: boolean) => void,
    handleSetPokemon: (value: IPokemon) => void,
    handleStartGame: () => void
) {
    //Set loading state true
    handleSetLoading(true);

    //Get the selected generations
    const selectedGenerations = getSelectedGenerations(generations);

    //If no generation is selected, select the first generation by default and rerun the start function
    if (selectedGenerations!.length <= 0) {
        selectDefaultGeneration(generations);
        handleStartGame();
        return;
    }

    //Get Pokémon species from selected generations
    const species = getSpecies(selectedGenerations);

    //Draw a random Pokémon
    const randomSpecie = drawRandomSpecies(species);

    //Fetch data from drawn Pokémon
    const specieData = getSpecieData(randomSpecie);

    //Handle the specie fetch result
    specieData
        .then((res) => handleSetPokemon(res))
        .catch((e) => {
            window.location.hash = "/error";
            throw new Error(e);
        })
        .finally(() => handleSetLoading(false));
}

export default startGame;
