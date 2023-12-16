//Interfaces
import { IPokemonShort } from "../../../Interfaces/interfaces";

function drawRandomSpecies(species: IPokemonShort[]) {
    const randomNumber = Math.floor(Math.random() * species.length);

    return species[randomNumber];
}

export default drawRandomSpecies;
