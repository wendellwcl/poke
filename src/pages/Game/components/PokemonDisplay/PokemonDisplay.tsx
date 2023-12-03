//Utils
import imgLoadingPlaceholder from "../../../../utils/imgLoadingPlaceholder";

//Interfaces
import { IPokemon } from "../../../../Interfaces/interfaces";

//Styles
import styles from "./styles/PokemonDisplay.styles.module.css";

interface Props {
    pokemon: IPokemon;
}

const PokemonDisplay = ({ pokemon }: Props) => {
    return (
        <div className={styles.pokemon_display_container} id="pokemon-display">
            <div className="loading_placeholder"></div>
            <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                onLoad={(e) => imgLoadingPlaceholder(e.currentTarget)}
                onError={(e) => imgLoadingPlaceholder(e.currentTarget)}
            />
        </div>
    );
};

export default PokemonDisplay;
