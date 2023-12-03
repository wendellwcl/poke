import { useState, useEffect, useRef, useContext } from "react";

//Contexts
import { PokemonListContext } from "../../contexts/PokemonListContext";

//Styles
import styles from "./styles/CustomInput.styles.module.css";

interface Props {
    id: string;
    placeholder: string;
    icon: React.ReactElement;
    submitFunction: Function;
}

const CustomInput = ({ placeholder, icon, id, submitFunction }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { pokemonList } = useContext(PokemonListContext);

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        inputRef.current!.focus();
    }, []);

    useEffect(() => {
        function handleWrongAnswer() {
            setInputValue("");
        }

        window.addEventListener("wrongAnswer", handleWrongAnswer);

        return () => {
            window.removeEventListener("wrongAnswer", handleWrongAnswer);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        submitFunction(inputValue);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.search_input}>
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
                <datalist id="pokemonNames">
                    {pokemonList.map((pokemon) => (
                        <option value={pokemon.name} key={pokemon.name} />
                    ))}
                </datalist>
                <button type="submit">{icon}</button>
            </div>
        </form>
    );
};

export default CustomInput;
