import { Link } from "react-router-dom";

//Styles
import styles from "./styles/styles.module.css";

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
                    <img src="/Pokedex.png" alt="Acessar Pokédex" />
                </Link>
                <Link to="/game">
                    <span>Quem é esse Pokémon ?</span>
                    <img src="/Game.png" alt="Jogar 'Quem é esse Pokémon ?'" />
                </Link>
            </div>
        </div>
    );
};

export default Greetings;
