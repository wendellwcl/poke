import { useContext } from "react";

//Contexts
import { GameContetx } from "../../../../contexts/GameContext/GameContext";

//Components
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

//Custom Hooks
import useModal from "../../../../hooks/useModal";

//Styles
import styles from "./styles/GenerationModalBody.styles.module.css";

const GenerationModalBody = () => {
    const { generationsList } = useContext(GameContetx);

    const { closeModal } = useModal();

    return (
        <div className={styles.generations_modal_body}>
            <h6 className={styles.description}>
                Selecione gerações para incluir ao jogo.
            </h6>
            <div className={styles.checkboxes_container}>
                {generationsList.map((generation, index) => (
                    <CustomCheckbox
                        text={`Geração ${index + 1}`}
                        generation={generation}
                        key={index}
                    />
                ))}
            </div>
            <div className={styles.generations_modal_footer}>
                <button onClick={() => closeModal("generations-modal")}>
                    Ok
                </button>
            </div>
        </div>
    );
};

export default GenerationModalBody;
