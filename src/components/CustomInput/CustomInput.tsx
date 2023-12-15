import { useState, useEffect, useRef } from "react";

//Custom Hooks
import usePokemonNameList from "../../hooks/usePokemonNameList";

//Styles
import styles from "./styles/CustomInput.styles.module.css";

interface Props {
    id: string;
    placeholder: string;
    icon: React.ReactElement;
    submitFunction?: Function;
}

const CustomInput = ({ placeholder, icon, id, submitFunction }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { pokemonNameList } = usePokemonNameList();

    const [inputValue, setInputValue] = useState<string>("");

    //Focus input
    useEffect(() => {
        inputRef.current!.focus();
    }, []);

    //This function handle with the input submit and can execute a submit function received via Props
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitFunction && inputValue) {
            submitFunction(inputValue, setInputValue);
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.custom_input}>
                <input
                    type="text"
                    id={id}
                    ref={inputRef}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.currentTarget.value);
                    }}
                    list="pokemonNames"
                />
                {inputValue.length > 0 && (
                    <datalist id="pokemonNames">
                        {pokemonNameList.map((pokemon) => (
                            <option value={pokemon.name} key={pokemon.name} />
                        ))}
                    </datalist>
                )}
                <button type="submit">{icon}</button>
            </div>
        </form>
    );
};

export default CustomInput;
