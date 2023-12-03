import { useState, useContext } from "react";

//Contexts
import { PokemonListContext } from "../../contexts/PokemonListContext";

//Styles
import styles from "./styles/CustomInput.styles.module.css";

interface Props {
    id: string;
    placeholder: string;
    icon: React.ReactElement;
    submitFunction: any;
}

const CustomInput = ({ placeholder, icon, id, submitFunction }: Props) => {
    const { pokemonList } = useContext(PokemonListContext);

    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = () => {
        submitFunction();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.search_input}>
                <input
                    type="text"
                    id={id}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
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
