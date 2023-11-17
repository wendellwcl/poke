import { useEffect, useState } from "react";

import { IPokemon } from "../../Interfaces/interfaces";

import styles from "./styles/styles.module.css";

const FrontPage = () => {
    const [pokemonCarousel, setPokemonCarousel] = useState<IPokemon[]>([]);

    useEffect(() => {
        const pokemonsIdArr: number[] = [1, 4, 7, 25];
        const carouselArr = [];

        for (let id of pokemonsIdArr) {
            carouselArr.push(
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) =>
                    res.json()
                )
            );
        }

        Promise.all(carouselArr).then((value) => {
            setPokemonCarousel(value);
        });
    }, []);

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
                <div className={styles.carousel}>
                    {pokemonCarousel &&
                        pokemonCarousel.map((pokemon) => (
                            <img
                                src={
                                    pokemon.sprites.other["official-artwork"]
                                        .front_default
                                }
                                alt={pokemon.name}
                                key={pokemon.id}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default FrontPage;
