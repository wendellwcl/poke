//Interfaces
import { IGeneration } from "../../../Interfaces/interfaces";

function getSelectedGenerations(generationsList: IGeneration[]) {
    const selectedGenerations: IGeneration[] = [];

    for (let generation of generationsList) {
        if (generation.selected) {
            selectedGenerations.push(generation);
        }
    }

    return selectedGenerations;
}

export default getSelectedGenerations;
