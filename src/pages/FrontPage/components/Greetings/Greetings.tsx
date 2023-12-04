import { Link } from "react-router-dom";

//Assets
import pokedexImg from "../../../../assets/images/Pokedex.png";
import gameImg from "../../../../assets/images/Game.png";

//Styles
import styles from "./styles/Greetings.styles.module.css";

interface Props {
    myClassName: string;
}

const Greetings = ({ myClassName }: Props) => {
    return (
        <div className={`${styles.greetings_container} ${myClassName}`}>
            <div className={styles.greetings_msg}>
                <h2>Temos Que Pegar !</h2>
                <p>
                    A jornada para se tornar um Mestre Pokémon começa aqui.
                    Explore a <Link to="/pokedex">Pokédex</Link> e conheça todas
                    espécies. Prepare-se para a batalha e teste seus
                    conhecimentos Pokémon! Torne-se um verdadeiro campeão em{" "}
                    <Link to="/game">"Quem é esse Pokémon ?"</Link>
                </p>
            </div>
            <div className={styles.img_container}>
                <Link to="/pokedex">
                    <span>Pokédex</span>
                    <img src={pokedexImg} alt="Acessar Pokédex" />
                </Link>
                <Link to="/game">
                    <span>Quem é esse Pokémon ?</span>
                    <img src={gameImg} alt="Jogar 'Quem é esse Pokémon ?'" />
                </Link>
            </div>
        </div>
    );
};

export default Greetings;
