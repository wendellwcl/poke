import { useState, useEffect } from "react";

//Interfaces
import { IGeneration } from "../../../../Interfaces/interfaces";

//Styles
import styles from "./styles/CustomCheckbox.module.css";

interface Props {
    text: string;
    generation: IGeneration;
}

const CustomCheckbox = ({ text, generation }: Props) => {
    const [isChecked, setIsChecked] = useState<boolean>(generation.selected);

    useEffect(() => {
        window.addEventListener("refreshCheckbox", () =>
            setIsChecked(generation.selected)
        );
    }, []);

    return (
        <label htmlFor={generation.name} className={styles.checkbox_container}>
            <input
                type="checkbox"
                id={generation.name}
                checked={isChecked}
                onChange={() => {
                    generation.toggleSelected();
                    setIsChecked(!isChecked);
                }}
            />
            <span className={styles.checkmark}></span>
            <span>{text}</span>
        </label>
    );
};

export default CustomCheckbox;
