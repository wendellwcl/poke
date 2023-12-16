//Classes
import { Generation } from "../../../classes/classes";

function getSelectedGenerations(generations: Generation[]) {
    const selectedGenerations = generations.filter((generation) => {
        return generation.selected;
    });

    return selectedGenerations;
}

export default getSelectedGenerations;
