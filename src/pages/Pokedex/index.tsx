import { useEffect, useContext, useState, useRef } from "react";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Components
import PokedexCard from "./components/PokedexCard";

//Interfaces
import { IPokemonShort } from "../../Interfaces/interfaces";

//Assets
import pokeball from "../../assets/svg/ball.svg";

//Styles
import styles from "./styles/styles.module.css";

const Pokedex = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    const loadingRef = useRef<HTMLDivElement>(null);

    const [pokedexArr, setPokedexArr] = useState<IPokemonShort[]>([]);
    const [nextEndpoint, setNextEndpoint] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("color");
    }, []);

    //Fetching first data
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
            .then((res) => res.json())
            .then((res) => {
                setPokedexArr([...res.results]);
                setNextEndpoint(res.next);
                setLoading(false);
            });
    }, []);

    //Automatic fetching data when the page is scrolled to the end
    useEffect(() => {
        //Function to fetch new data when the page is scrolled to the end
        async function fetchIfArrivedAtBottom() {
            const scrollValue = window.scrollY + window.innerHeight;
            const scrollLimit = document.body.scrollHeight;

            if (scrollValue >= scrollLimit - 100 && nextEndpoint) {
                window.removeEventListener("scroll", fetchIfArrivedAtBottom);

                loadingRef.current!.style.display = "flex";

                await fetch(nextEndpoint)
                    .then((res) => res.json())
                    .then((res) => {
                        setPokedexArr((prev) => [...prev, ...res.results]);
                        setNextEndpoint(res.next);
                        loadingRef.current!.style.display = "none";
                    });
            }
        }

        //Adding the function at window
        //For correct operation, the function will be re-added / updated according to the dependency array
        window.addEventListener("scroll", fetchIfArrivedAtBottom);

        //Clean up function
        return () => {
            window.removeEventListener("scroll", fetchIfArrivedAtBottom);
        };
    }, [pokedexArr, nextEndpoint]);

    return (
        <div className={styles.pokedex_container}>
            {loading ? (
                <div className={styles.loading_container}>
                    <img src={pokeball} className={styles.loading_img} />
                </div>
            ) : (
                <>
                    <div className={styles.pokedex_grid}>
                        {pokedexArr.length > 0 &&
                            pokedexArr.map((pokemon, index) => (
                                <PokedexCard key={index} pokemon={pokemon} />
                            ))}
                    </div>
                    <div className={styles.loading} ref={loadingRef}>
                        <img src={pokeball} className={styles.loading_img} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Pokedex;
