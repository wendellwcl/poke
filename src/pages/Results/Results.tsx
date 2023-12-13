import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Custom Hooks
import useSearch from "../../hooks/useSearch";

//Components
import CustomInput from "../../components/CustomInput/CustomInput";
import PokeCard from "../../components/PokeCard/PokeCard";

//Interfaces
import { IPokemonShort } from "../../Interfaces/interfaces";

//Assets
import pokeball from "../../assets/svg/ball.svg";

//Styles
import styles from "./styles/Results.styles.module.css";

const Results = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    const { handleSearch } = useSearch();

    const { pokemon } = useParams();

    const [pokemonData, setPokemonData] = useState<IPokemonShort | null>();
    const [loading, setLoading] = useState<boolean>(true);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("color");
    }, []);

    //Fetching data
    useEffect(() => {
        setLoading(true);

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw "Search without results or error fetching Pokémon data";
                }
            })
            .then(() => {
                setPokemonData({
                    name: pokemon!,
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/`,
                });
            })
            .catch((e) => {
                setPokemonData(null);
                console.error(e);
            })
            .finally(() => setLoading(false));
    }, [pokemon]);

    return (
        <div className={styles.results_container}>
            <div className={styles.search_input}>
                <CustomInput
                    id="search-input"
                    placeholder="Pesquisar Pokémon"
                    icon={<BsSearch />}
                    submitFunction={handleSearch}
                />
            </div>
            <div className={styles.results}>
                {!loading ? (
                    <>
                        {pokemonData ? (
                            <PokeCard
                                pokemonName={pokemonData.name}
                                pokemonUrl={pokemonData.url}
                            />
                        ) : (
                            <div>Busca sem resultado.</div>
                        )}
                    </>
                ) : (
                    <div className={styles.loading}>
                        <img src={pokeball} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Results;
