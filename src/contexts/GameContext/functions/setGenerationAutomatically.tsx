//Interfaces
import { IGeneration } from "../../../Interfaces/interfaces";

function setGenerationAutomatically(generationsList: IGeneration[]) {
    //Mark first generation as selected
    generationsList[0].toggleSelected();

    //Dispatch event to force checkbox state update
    let generationCheckboxRefreshEvent = new Event("refreshCheckbox");
    window.dispatchEvent(generationCheckboxRefreshEvent);

    return;
}

export default setGenerationAutomatically;
