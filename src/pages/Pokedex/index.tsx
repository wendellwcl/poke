import { useEffect, useContext, useState } from "react";

import { HeaderBgContext } from "../../contexts/HeaderBgContext";

import { IPokemonShort } from "../../Interfaces/interfaces";

const Pokedex = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    const [pokedexArr, setPokedexArr] = useState<IPokemonShort[]>([]);
    const [nextEndpoint, setNextEndpoint] = useState<string | null>(null);

    useEffect(() => {
        setHeaderBg("color");
    }, []);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
            .then((res) => res.json())
            .then((res) => {
                setPokedexArr([...res.results]);
                setNextEndpoint(res.next);
            });
    }, []);

    useEffect(() => {
        function fetchIfArrivedAtBottom() {
            const scrollValue = window.scrollY + window.innerHeight;
            const scrollLimit = document.body.scrollHeight;

            if (scrollValue === scrollLimit && nextEndpoint) {
                fetch(nextEndpoint)
                    .then((res) => res.json())
                    .then((res) => {
                        setPokedexArr((prev) => [...prev, ...res.results]);
                        setNextEndpoint(res.next);
                    });
            }
        }

        window.removeEventListener("wheel", fetchIfArrivedAtBottom);
        window.addEventListener("wheel", fetchIfArrivedAtBottom);

        return () => {
            window.removeEventListener("wheel", fetchIfArrivedAtBottom);
        };
    }, [pokedexArr, nextEndpoint]);

    return <div>pokedéx</div>;
};

export default Pokedex;
