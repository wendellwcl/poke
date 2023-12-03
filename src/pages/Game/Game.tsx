import { useEffect, useContext } from "react";

//Components
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PokemonDisplay from "./components/PokemonDisplay/PokemonDisplay";
import Modal from "./components/Modal/Modal";
import GenerationModalBody from "./components/GenerationModalBody/GenerationModalBody";

//Contexts
import { GameContetx } from "../../contexts/GameContext/GameContext";
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Utils
import openModal from "../../utils/openModal";

//Styles
import styles from "./styles/Game.styles.module.css";

const Game = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);
    const { generationsList, loading, handleStart, pokemon } =
        useContext(GameContetx);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("transparent");
    }, []);

    //Start the Game
    useEffect(() => {
        if (!loading) {
            handleStart();
        }
    }, [generationsList]);

    return (
        <>
            {loading || !pokemon ? (
                <LoadingScreen />
            ) : (
                <div className={styles.game_container}>
                    <div className="left_container">
                        {pokemon && <div>{pokemon.name}</div>}

                        <button onClick={() => openModal("generations-modal")}>
                            Abrir
                        </button>
                        <button onClick={() => handleStart()}>Jogar</button>
                    </div>
                    <div className="right_container">
                        <PokemonDisplay pokemon={pokemon} />
                    </div>
                    <Modal title="Gerações" modalId="generations-modal">
                        <GenerationModalBody />
                    </Modal>
                </div>
            )}
        </>
    );
};

export default Game;
