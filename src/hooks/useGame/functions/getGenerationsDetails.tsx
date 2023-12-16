//Interfaces
import { IGeneration } from "../../../Interfaces/interfaces";

//Classes
import { Generation } from "../../../classes/classes";

async function getGenerationsDetails(generationsList: IGeneration[]) {
    const generationsDetails: Generation[] = [];

    //Fetching generations details
    const fetchGenerationsDetails = generationsList.map(
        async (generation: IGeneration, index: number) => {
            await fetch(generation.url)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw "Error fetching generations species";
                    }
                })
                .then((res) => {
                    const newGeneration = new Generation(
                        res.id,
                        res.name,
                        generation.url,
                        res.pokemon_species,
                        index === 0
                    );

                    generationsDetails.push(newGeneration);
                });
        }
    );

    //Ensure that all fetches have been completed
    const generationsDetailsValue = await Promise.all(
        fetchGenerationsDetails
    ).then(() => {
        //Sort arr to ensure correct order
        generationsDetails.sort((a, b) => {
            return a.id - b.id;
        });

        return generationsDetails;
    });

    return generationsDetailsValue;
}

export default getGenerationsDetails;
