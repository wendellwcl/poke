import { useEffect, useState } from "react";

//Interfaces
import { IPokemonShort } from "../Interfaces/interfaces";

const usePokedex = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [pokedexArr, setPokedexArr] = useState<IPokemonShort[]>([]);
    const [nextEndpoint, setNextEndpoint] = useState<string | null>(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
    );

    //Handle fetch pokedex data
    function fetchPokedex(finallyCallback?: () => void) {
        if (nextEndpoint) {
            fetch(nextEndpoint)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw "Error fetching Pokedex data";
                    }
                })
                .then((res) => {
                    //Handling duplicate data
                    const pokemonSet = new Set([...pokedexArr, ...res.results]);
                    const pokemonArr = Array.from(pokemonSet);

                    setPokedexArr(pokemonArr);
                    setNextEndpoint(res.next);
                })
                .catch((e) => {
                    window.location.hash = "/error";
                    throw new Error(e);
                })
                .finally(() => {
                    if (finallyCallback) {
                        finallyCallback();
                    }
                    setLoading(false);
                });
        }
    }

    //Automatic fetch when the page scrolls to the bottom
    function fetchIfArrivedAtBottom() {
        const scrollValue = window.scrollY + window.innerHeight;
        const scrollLimit = document.body.offsetHeight;

        if (scrollValue >= scrollLimit - 100 && nextEndpoint) {
            window.removeEventListener("scroll", handleFetchIfArrivedAtBottom);

            const pokedexEl = document.querySelector(
                "#pokedex-container"
            ) as HTMLElement;

            pokedexEl.classList.add("loading");

            fetchPokedex(() => {
                pokedexEl.classList.remove("loading");
            });
        }
    }

    //Handle with the automatic fetch
    function handleFetchIfArrivedAtBottom() {
        fetchIfArrivedAtBottom();
    }

    //Fetch first data
    useEffect(() => {
        fetchPokedex();
    }, []);

    //Adding the automatic fetch function at window
    useEffect(() => {
        //For correct operation, the function will be re-added / updated when nextEndpoint changes
        window.addEventListener("scroll", handleFetchIfArrivedAtBottom);

        //Clean up function
        return () => {
            window.removeEventListener("scroll", handleFetchIfArrivedAtBottom);
        };
    }, [nextEndpoint]);

    return { loading, pokedexArr };
};

export default usePokedex;
