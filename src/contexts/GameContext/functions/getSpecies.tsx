//Interfaces
import { IGeneration, IPokemonShort } from "../../../Interfaces/interfaces";

function getSpecies(generations: IGeneration[]) {
    const species: IPokemonShort[] = [];

    for (let generation of generations) {
        species.push(...generation.species);
    }

    return species;
}

export default getSpecies;
