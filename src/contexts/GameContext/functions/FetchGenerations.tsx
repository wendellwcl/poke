//Interfaces
import { IPokemonShort, IGeneration } from "../../../Interfaces/interfaces";

class Generation {
    constructor(
        public name: string,
        public url: string,
        public species: IPokemonShort[],
        public selected: boolean
    ) {
        this.name = name;
        this.species = species;
        this.selected = selected;
    }
}

async function fetchGenerations(
    handleSetLoading: (value: boolean) => void,
    handleSetGenerationsList: (value: IGeneration[]) => void
) {
    handleSetLoading(true);

    const temporaryArray: IGeneration[] = [];

    //1. Fetch Generations
    const generations = await fetch("https://pokeapi.co/api/v2/generation/")
        .then((res) => res.json())
        .then((res) => {
            return res.results;
        });

    //2. Fetch Species
    const fetchSpecies = await generations.map(
        async (generation: IGeneration, index: number) => {
            await fetch(generation.url)
                .then((res) => res.json())
                .then((res) => {
                    //3. Check if generation is duplicated
                    const isDuplicated = temporaryArray.some((generation) => {
                        checkDuplicate(generation, generation.name);
                    });

                    //4. Build new generation obj and add in array
                    if (!isDuplicated) {
                        const newGeneration = new Generation(
                            generation.name,
                            generation.url,
                            res.pokemon_species,
                            index === 0
                        );

                        temporaryArray.push(newGeneration);
                    }
                });
        }
    );

    Promise.all(fetchSpecies).then(() => {
        handleSetGenerationsList(temporaryArray);
        handleSetLoading(false);
    });
}

function checkDuplicate(generation: IGeneration, newGeneration: string) {
    return generation.name === newGeneration;
}

export default fetchGenerations;
