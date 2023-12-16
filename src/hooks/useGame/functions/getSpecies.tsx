//Classes
import { Generation } from "../../../classes/classes";

function getSpecies(selectedGenerations: Generation[]) {
    const species = selectedGenerations.map((generation) => {
        return generation.species;
    });

    return species.flat();
}

export default getSpecies;
