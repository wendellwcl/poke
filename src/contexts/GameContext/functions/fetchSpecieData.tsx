//Interfaces
import { IPokemonShort } from "../../../Interfaces/interfaces";

function fetchSpecieData(specie: IPokemonShort) {
    const data = fetch(`https://pokeapi.co/api/v2/pokemon/${specie.name}/`)
        .then((res) => res.json())
        .then((res) => {
            return res;
        });

    return data;
}

export default fetchSpecieData;
