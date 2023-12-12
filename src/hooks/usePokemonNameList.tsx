import { useEffect, useState } from "react";

//Interfaces
import { IPokemonShort } from "../Interfaces/interfaces";

const usePokemonNameList = () => {
    const [pokemonNameList, setPokemonNameList] = useState<IPokemonShort[]>([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw "Error fetching Pokémon name list";
                }
            })
            .then((res) => setPokemonNameList(res.results))
            .catch((e) => {
                throw new Error(e);
            });
    }, []);

    return { pokemonNameList };
};

export default usePokemonNameList;
