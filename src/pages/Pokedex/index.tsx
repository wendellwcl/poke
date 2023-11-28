import { useEffect, useContext, useState, useRef, FormEvent } from "react";
import { BsSearch } from "react-icons/bs";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";
import { PokemonListContext } from "../../contexts/PokemonListContext";

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
    const { pokemonList } = useContext(PokemonListContext);

    const loadingRef = useRef<HTMLDivElement>(null);

    const [pokedexArr, setPokedexArr] = useState<IPokemonShort[]>([]);
    const [nextEndpoint, setNextEndpoint] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchInputValue, setSearchInputValue] = useState<string>("");

    async function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (searchInputValue != "") {
            setLoading(true);

            await fetch(
                `https://pokeapi.co/api/v2/pokemon/${searchInputValue}/`
            )
                .then((res) => {
                    if (res.status != 200) {
                        throw "Sem resultados";
                    }
                    return res.json();
                })
                .then((res) =>
                    setPokedexArr([
                        {
                            name: res.name,
                            url: `https://pokeapi.co/api/v2/pokemon/${res.id}/`,
                        },
                    ])
                )
                .catch((err) => {
                    setPokedexArr([]);
                    setLoading(false);
                    throw new Error(err);
                });

            setLoading(false);
        }
    }

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
                    <div className={styles.search_bar}>
                        <form onSubmit={(e) => handleSearch(e)}>
                            <div className={styles.search_input}>
                                <input
                                    type="text"
                                    placeholder="Buscar Pokémon"
                                    value={searchInputValue}
                                    onChange={(e) =>
                                        setSearchInputValue(
                                            e.currentTarget.value
                                        )
                                    }
                                    list="pokemonNames"
                                />
                                <datalist id="pokemonNames">
                                    {pokemonList.map((pokemon) => (
                                        <option
                                            value={pokemon.name}
                                            key={pokemon.name}
                                        />
                                    ))}
                                </datalist>
                                <button type="submit">
                                    <BsSearch />
                                </button>
                            </div>
                        </form>
                    </div>
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
                </>
            )}
        </div>
    );
};

export default Pokedex;
