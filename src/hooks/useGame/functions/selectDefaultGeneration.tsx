//Classes
import { Generation } from "../../../classes/classes";

function selectDefaultGeneration(generations: Generation[]) {
    generations[0].toggleSelected();
}

export default selectDefaultGeneration;
