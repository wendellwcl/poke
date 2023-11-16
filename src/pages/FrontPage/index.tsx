import styles from "./styles/styles.module.css";

const FrontPage = () => {
    return (
        <section className={styles.frontPage_container}>
            <div className={styles.greetings_container}>
                <div className={styles.greetings_msg}>
                    <h2>Temos Que Pegar !</h2>
                    <p>
                        A jornada para se tornar um Mestre Pokémon começa aqui.
                        Explore a <a href="#">Pokédex</a> e conheça todas
                        espécies. Prepare-se para a batalha e teste seus
                        conhecimentos Pokémon! Torne-se um verdadeiro campeão em{" "}
                        <a href="#">"Quem é esse Pokémon ?"</a>
                    </p>
                </div>
                <div className={styles.img_container}>
                    <a href="#">
                        <span>Pokédex</span>
                        <img src="https://placehold.co/600x400/png" alt="" />
                    </a>
                    <a href="#">
                        <span>Quem é esse Pokémon ?</span>
                        <img src="https://placehold.co/600x400/png" alt="" />
                    </a>
                </div>
            </div>
            <div className={styles.carousel_container}>
                <div className={styles.carousel}>CAROUSEL</div>
            </div>
        </section>
    );
};

export default FrontPage;
