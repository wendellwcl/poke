import { useEffect, useContext } from "react";

//Components
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import PokemonDisplay from "./components/PokemonDisplay/PokemonDisplay";
import GameInterface from "./components/GameInterface/GameInterface";
import Modal from "./components/Modal/Modal";
import GenerationModalBody from "./components/GenerationModalBody/GenerationModalBody";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Styles
import styles from "./styles/Game.styles.module.css";

import useGame from "../../hooks/useGame/useGame";

const Game = () => {
    const {
        loading,
        generations,
        pokemon,
        handleStartGame,
        handleGuessPokemon,
    } = useGame();

    const { setHeaderBg } = useContext(HeaderBgContext);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("transparent");
    }, []);

    //Start the Game
    useEffect(() => {
        !loading && handleStartGame();
    }, [generations]);

    return (
        <>
            {loading || !pokemon ? (
                <LoadingScreen />
            ) : (
                <div className={styles.game_container}>
                    <div className="left_container">
                        <GameInterface
                            handleStartGame={handleStartGame}
                            handleGuessPokemon={handleGuessPokemon}
                            pokemon={pokemon}
                        />
                    </div>
                    <div className="right_container">
                        <PokemonDisplay pokemon={pokemon} />
                    </div>
                    <Modal title="Gerações" modalId="generations-modal">
                        <GenerationModalBody generations={generations} />
                    </Modal>
                </div>
            )}
        </>
    );
};

export default Game;
