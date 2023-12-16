//Interfaces
import { IGeneration } from "../../../Interfaces/interfaces";

async function getGenerationsList() {
    //Fetching generations list
    const generations: IGeneration[] = await fetch(
        "https://pokeapi.co/api/v2/generation/"
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw "Error fetching generations";
            }
        })
        .then((res) => {
            return res.results;
        });

    return generations;
}

export default getGenerationsList;
