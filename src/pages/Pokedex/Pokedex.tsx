import { useEffect, useContext } from "react";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Custom Hooks
import usePokedex from "../../hooks/usePokedex";

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

    //Changing Header background
    useEffect(() => {
        setHeaderBg("color");
    }, []);

    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <div className={styles.pokedex_container}>
                    <div className={styles.pokedex_grid}>
                        {pokedexArr.length > 0 ? (
                            pokedexArr.map((pokemon, index) => (
                                <PokedexCard key={index} pokemon={pokemon} />
                            ))
                        ) : (
                            <span>Sem resultados</span>
                        )}
                    </div>
                    <div className={styles.loading} id="pokedex-bottom-loading">
                        <img src={pokeball} className={styles.loading_img} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Pokedex;
