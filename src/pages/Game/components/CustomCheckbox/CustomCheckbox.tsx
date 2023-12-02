//Styles
import styles from "./styles/CustomCheckbox.module.css";

interface Props {
    text: string;
    checkboxId: string;
    defaultChecked: boolean;
}

const CustomCheckbox = ({ text, checkboxId, defaultChecked }: Props) => {
    return (
        <label htmlFor={checkboxId} className={styles.checkbox_container}>
            <input
                type="checkbox"
                id={checkboxId}
                defaultChecked={defaultChecked}
            />
            <span className={styles.checkmark}></span>
            <span>{text}</span>
        </label>
    );
};

export default CustomCheckbox;
