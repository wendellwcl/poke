import { useEffect, useState } from "react";

//Interfaces
import { IPokemon } from "../../../../Interfaces/interfaces";

//Functions
import fetchPokemonCarousel from "./functions/fetchPokemonCarousel";

//Styles
import styles from "./styles/Carousel.styles.module.css";

interface Props {
    myClassName: string;
}

const Carousel = ({ myClassName }: Props) => {
    const [pokemonCarousel, setPokemonCarousel] = useState<IPokemon[]>([]);

    //Fetching data
    useEffect(() => {
        const handleSetPokemonCarousel = (pokemonList: IPokemon[]) => {
            setPokemonCarousel(pokemonList);
        };

        fetchPokemonCarousel(handleSetPokemonCarousel);
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
