//Interfaces
import { IPokemon } from "../../../../../Interfaces/interfaces";

const fetchPokemonCarousel = (
    handleSetPokemonCarousel: (pokemonList: IPokemon[]) => void
) => {
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
        handleSetPokemonCarousel(value);
    });
};

export default fetchPokemonCarousel;
