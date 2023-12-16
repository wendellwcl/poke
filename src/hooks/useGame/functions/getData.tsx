//Functions
import getGenerationsList from "./getGenerationsList";
import getGenerationsDetails from "./getGenerationsDetails";

//Classes
import { Generation } from "../../../classes/classes";

//Interfaces
import { IGeneration } from "../../../Interfaces/interfaces";

async function getData(
    handleSetLoading: (value: boolean) => void,
    handleSetGenerations: (value: Generation[]) => void
) {
    const generationsList: IGeneration[] = await getGenerationsList();

    const generationsData: Generation[] = await getGenerationsDetails(
        generationsList
    );

    handleSetGenerations(generationsData);
    handleSetLoading(false);
}

export default getData;
