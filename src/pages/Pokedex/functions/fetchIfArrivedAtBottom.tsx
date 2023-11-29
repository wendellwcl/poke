//Interfaces
import { IPokemonShort } from "../../../Interfaces/interfaces";

const fetchIfArrivedAtBottom = async (
    nextEndpoint: string,
    loadingEl: HTMLDivElement,
    handleSetPokedexArr: (newPokemons: IPokemonShort[]) => void,
    handleSetNextEndpoint: (nextEndpoint: string) => void,
    handleFetchIfArrivedAtBottom: () => void
) => {
    const scrollValue = window.scrollY + window.innerHeight;
    const scrollLimit = document.body.scrollHeight;

    if (scrollValue >= scrollLimit - 100 && nextEndpoint) {
        window.removeEventListener("scroll", handleFetchIfArrivedAtBottom);

        loadingEl.style.display = "flex";

        await fetch(nextEndpoint)
            .then((res) => res.json())
            .then((res) => {
                handleSetPokedexArr(res.results);
                handleSetNextEndpoint(res.next);
                loadingEl!.style.display = "none";
            });
    }
};

export default fetchIfArrivedAtBottom;
