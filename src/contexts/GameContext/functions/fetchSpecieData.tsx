//Interfaces
import { IPokemonShort } from "../../../Interfaces/interfaces";

function fetchSpecieData(specie: IPokemonShort) {
    const data = fetch(
        `https://pokeapi.co/api/v2/pokemon/${specie.name}/`
    ).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Error fetching game data";
        }
    });

    return data;
}

export default fetchSpecieData;
