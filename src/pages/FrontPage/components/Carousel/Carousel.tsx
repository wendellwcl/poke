import { useEffect, useState } from "react";

//Interfaces
import { IPokemon } from "../../../../Interfaces/interfaces";

//Functions
import fetchPokemonCarousel from "./functions/fetchPokemonCarousel";

//Assets
import pokeball from "../../../../assets/svg/ball.svg";

//Styles
import styles from "./styles/Carousel.styles.module.css";

interface Props {
    myClassName?: string;
}

const Carousel = ({ myClassName }: Props) => {
    const [pokemonCarousel, setPokemonCarousel] = useState<IPokemon[] | null>(
        null
    );

    //Function to handle with 'pokemonCarousel' state
    const handleSetPokemonCarousel = (pokemonList: IPokemon[] | null) => {
        setPokemonCarousel(pokemonList);
    };

    //Fetch carousel data
    useEffect(() => {
        fetchPokemonCarousel(handleSetPokemonCarousel);
    }, []);

    return (
        <div className={myClassName}>
            <div className={`${styles.carousel_container}`}>
                {pokemonCarousel ? (
                    <div className={styles.carousel}>
                        {pokemonCarousel.map((pokemon) => (
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
                ) : (
                    <div className={styles.carousel_placeholder}>
                        <img src={pokeball} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carousel;
