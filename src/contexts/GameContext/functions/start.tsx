//Functions
import getSelectedGenerations from "./getSelectedGenerations";
import setGenerationAutomatically from "./setGenerationAutomatically";
import getSpecies from "./getSpecies";
import drawRandomSpecies from "./drawRandomSpecies";
import fetchSpecieData from "./fetchSpecieData";

//Interfaces
import { IGeneration, IPokemon } from "../../../Interfaces/interfaces";

function start(
    generationsList: IGeneration[],
    handleSetLoading: (value: boolean) => void,
    handleSetPokemon: (value: IPokemon) => void,
    handleStart: () => void
) {
    //Set loading state true
    handleSetLoading(true);

    //Get the selected generations
    const selectedGenerations = getSelectedGenerations(generationsList);

    //If no generation is selected, select the first generation by default and rerun the start function
    if (selectedGenerations!.length <= 0) {
        setGenerationAutomatically(generationsList);
        handleStart();
        return;
    }

    //Get Pokémon species from selected generations
    const species = getSpecies(selectedGenerations);

    //Draw a random Pokémon
    const randomSpecie = drawRandomSpecies(species);

    //Fetch data from drawn Pokémon
    const specieData = fetchSpecieData(randomSpecie);

    //Handle the specie fetch result
    specieData
        .then((res) => handleSetPokemon(res))
        .catch((e) => {
            window.location.hash = "/error";
            throw new Error(e);
        })
        .finally(() => handleSetLoading(false));
}

export default start;
