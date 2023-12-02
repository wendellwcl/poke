import { useContext } from "react";

//Contexts
import { GameContetx } from "../../../../contexts/GameContext/GameContext";

//Components
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

//Styles
import styles from "./styles/GenerationModalBody.styles.module.css";

const GenerationModalBody = () => {
    const { generationsList } = useContext(GameContetx);

    return (
        <div className={styles.generations_modal_body}>
            <h6 className={styles.description}>
                Selecione gerações para incluir ao jogo.
            </h6>
            <div className={styles.checkboxes_container}>
                {generationsList.map((generation, index) => (
                    <CustomCheckbox
                        text={`Geração ${index + 1}`}
                        checkboxId={generation.name}
                        defaultChecked={generation.selected}
                        toggleChecked={generation.toggleSelected}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default GenerationModalBody;
