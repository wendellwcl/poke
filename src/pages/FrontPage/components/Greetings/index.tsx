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
                    Explore a <a href="#">Pokédex</a> e conheça todas espécies.
                    Prepare-se para a batalha e teste seus conhecimentos
                    Pokémon! Torne-se um verdadeiro campeão em{" "}
                    <a href="#">"Quem é esse Pokémon ?"</a>
                </p>
            </div>
            <div className={styles.img_container}>
                <a href="#">
                    <span>Pokédex</span>
                    <img src="/Pokedex.png" alt="Acessar Pokédex" />
                </a>
                <a href="#">
                    <span>Quem é esse Pokémon ?</span>
                    <img src="/Game.png" alt="Jogar 'Quem é esse Pokémon ?'" />
                </a>
            </div>
        </div>
    );
};

export default Greetings;
