//Interfaces
import { IPokemon } from "../../../../../Interfaces/interfaces";

const fetchPokemonCarousel = (
    handleSetPokemonCarousel: (pokemonList: IPokemon[] | null) => void
) => {
    //Carousel Pokémon id array
    const pokemonsIdArr: number[] = [25, 1, 4, 7, 94];
    const carouselArr = [];

    //Fetch data for each Pokémon
    for (let id of pokemonsIdArr) {
        carouselArr.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw "Error fetching carousel data";
                }
            })
        );
    }

    //Handling with data after all requests are resolved
    Promise.all(carouselArr)
        .then((carouselData) => {
            {
                handleSetPokemonCarousel(carouselData);
            }
        })
        .catch((e) => {
            handleSetPokemonCarousel(null);
            throw new Error(e);
        });
};

export default fetchPokemonCarousel;
