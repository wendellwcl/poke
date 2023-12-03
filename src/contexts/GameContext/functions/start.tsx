//Functions
import getSelectedGenerations from "./getSelectedGenerations";
import setGenerationAutomatically from "./setGenerationAutomatically";
import getSpecies from "./getSpecies";
import drawRandomSpecies from "./drawRandomSpecies";
import fetchSpecieData from "./fetchSpecieData";

//Interfaces
import { IGeneration } from "../../../Interfaces/interfaces";

async function start(generationsList: IGeneration[], handleStart: () => void) {
    const selectedGenerations = getSelectedGenerations(generationsList);

    if (selectedGenerations!.length <= 0) {
        setGenerationAutomatically(generationsList);

        //Rerun the function automatically
        handleStart();
        return;
    }

    const species = getSpecies(selectedGenerations);

    const randomSpecie = drawRandomSpecies(species);

    const specieData = await fetchSpecieData(randomSpecie);

    return specieData;
}

export default start;
