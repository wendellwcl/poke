import { useEffect, useContext, useState, useRef } from "react";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Components
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PokedexCard from "./components/PokedexCard/PokedexCard";
import SearchBar from "./components/SearchBar/SearchBar";

//Functions
import fetchIfArrivedAtBottom from "./functions/fetchIfArrivedAtBottom";

//Interfaces
import { IPokemonShort } from "../../Interfaces/interfaces";

//Assets
import pokeball from "../../assets/svg/ball.svg";

//Styles
import styles from "./styles/Pokedex.styles.module.css";

const Pokedex = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    const loadingRef = useRef<HTMLDivElement>(null);

    const [pokedexArr, setPokedexArr] = useState<IPokemonShort[]>([]);
    const [nextEndpoint, setNextEndpoint] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleSetPokedexArr = (newPokemons: IPokemonShort[]) => {
        setPokedexArr((prev) => [...prev, ...newPokemons]);
    };

    const handleSetPokedexArrBySearch = (results: IPokemonShort[]) => {
        setPokedexArr(results);
    };

    const handleSetNextEndpoint = (nextEndpoint: string) => {
        setNextEndpoint(nextEndpoint);
    };

    const handleSetLoading = (value: boolean) => {
        setLoading(value);
    };

    //Changing Header background
    useEffect(() => {
        setHeaderBg("color");
    }, []);

    //Fetching first data
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
            .then((res) => res.json())
            .then((res) => {
                setPokedexArr(res.results);
                setNextEndpoint(res.next);
            })
            .then(() => {
                setLoading(false);
            });
    }, []);

    //Automatic fetching data when the page is scrolled to the end
    useEffect(() => {
        const handleFetchIfArrivedAtBottom = () => {
            fetchIfArrivedAtBottom(
                nextEndpoint!,
                loadingRef.current!,
                handleSetPokedexArr,
                handleSetNextEndpoint,
                handleFetchIfArrivedAtBottom
            );
        };

        //Adding the function at window
        //For correct operation, the function will be re-added / updated according to the dependency array
        window.addEventListener("scroll", handleFetchIfArrivedAtBottom);

        //Clean up function
        return () => {
            window.removeEventListener("scroll", handleFetchIfArrivedAtBottom);
        };
    }, [nextEndpoint]);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <div className={styles.pokedex_container}>
                    <SearchBar
                        handleSetLoading={handleSetLoading}
                        handleSetPokedexArrBySearch={
                            handleSetPokedexArrBySearch
                        }
                    />
                    <div className={styles.pokedex_grid}>
                        {pokedexArr.length > 0 ? (
                            pokedexArr.map((pokemon, index) => (
                                <PokedexCard key={index} pokemon={pokemon} />
                            ))
                        ) : (
                            <span>Sem resultados</span>
                        )}
                    </div>
                    <div className={styles.loading} ref={loadingRef}>
                        <img src={pokeball} className={styles.loading_img} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Pokedex;
