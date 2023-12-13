import { useEffect, useContext, useRef } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Custom Hooks
import usePokedex from "../../hooks/usePokedex";
import useSearch from "../../hooks/useSearch";

//Components
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PokedexCard from "./components/PokedexCard/PokedexCard";

//Assets
import pokeball from "../../assets/svg/ball.svg";

//Styles
import styles from "./styles/Pokedex.styles.module.css";

const Pokedex = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    const { loading, pokedexArr } = usePokedex();
    const { handleSearch } = useSearch();

    const btnToTopRef = useRef<HTMLButtonElement>(null);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("color");
    }, []);

    //Function to scroll to top
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    //Function to show the 'btn to top'
    function handleDisplayBtnToTop() {
        const scrollValue = window.scrollY;

        if (scrollValue > 1000) {
            btnToTopRef.current!.style.display = "block";
        } else {
            btnToTopRef.current!.style.display = "none";
        }
    }

    //Adding 'handleDisplayBtnToTop' function on scroll event
    useEffect(() => {
        window.addEventListener("scroll", handleDisplayBtnToTop);

        //Clean up
        return () => {
            window.removeEventListener("scroll", handleDisplayBtnToTop);
        };
    }, []);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <div className={styles.pokedex_container}>
                    <div className={styles.pokedex_grid}>
                        {pokedexArr.length > 0 &&
                            pokedexArr.map((pokemon, index) => (
                                <PokedexCard key={index} pokemon={pokemon} />
                            ))}
                    </div>
                    <div className={styles.loading} id="pokedex-bottom-loading">
                        <img src={pokeball} className={styles.loading_img} />
                    </div>
                    <button
                        className={styles.btn_toTop}
                        ref={btnToTopRef}
                        onClick={scrollToTop}
                    >
                        <BsFillArrowUpCircleFill />
                    </button>
                </div>
            )}
        </>
    );
};

export default Pokedex;
