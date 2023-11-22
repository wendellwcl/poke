import { useEffect, useContext, useState } from "react";

import { HeaderBgContext } from "../../contexts/HeaderBgContext";

import { IPokemonShort } from "../../Interfaces/interfaces";

import PokedexCard from "./components/PokedexCard";

import styles from "./styles/styles.module.css";

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
        async function fetchIfArrivedAtBottom() {
            const scrollValue = window.scrollY + window.innerHeight;
            const scrollLimit = document.body.scrollHeight;

            if (scrollValue >= scrollLimit && nextEndpoint) {
                await fetch(nextEndpoint)
                    .then((res) => res.json())
                    .then((res) => {
                        setPokedexArr((prev) => [...prev, ...res.results]);
                        setNextEndpoint(res.next);
                    });
            }
        }

        window.addEventListener("scroll", fetchIfArrivedAtBottom);

        return () => {
            window.removeEventListener("scroll", fetchIfArrivedAtBottom);
        };
    }, [pokedexArr, nextEndpoint]);

    return (
        <div>
            <div className={styles.pokedex_container}>
                {pokedexArr.length > 0 &&
                    pokedexArr.map((pokemon, index) => (
                        <PokedexCard key={index} pokemon={pokemon} />
                    ))}
            </div>
        </div>
    );
};

export default Pokedex;
