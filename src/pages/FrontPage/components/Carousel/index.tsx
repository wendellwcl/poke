import { useEffect, useState } from "react";

import { IPokemon } from "../../../../Interfaces/interfaces";

import styles from "./styles/styles.module.css";

interface Props {
    myClassName: string;
}

const Carousel = ({ myClassName }: Props) => {
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
        <div className={`${styles.carousel_container} ${myClassName}`}>
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
    );
};

export default Carousel;
