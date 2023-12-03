import { useContext, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";

//Components
import CustomInput from "../../../../components/CustomInput/CustomInput";

//Contexts
import { GameContetx } from "../../../../contexts/GameContext/GameContext";

//Utils
import openModal from "../../../../utils/openModal";

//Styles
import styles from "./styles/GameInterface.styles.module.css";

const GameInterface = () => {
    const { handleGuessPokemon, handleStart, pokemon } =
        useContext(GameContetx);

    const btnRef = useRef<HTMLButtonElement | null>(null);
    const hintRef = useRef<HTMLSpanElement | null>(null);

    const [hint, setHint] = useState<string>("");

    const handleHint = (name: string) => {
        let hint: string | string[] = Array.from(name);
        hint = hint.fill("_", 2);
        hint = hint.join(" ");
        setHint(hint);

        btnRef.current!.style.display = "none";
        hintRef.current!.style.display = "block";
    };

    return (
        <div className={styles.game_interface_container}>
            <label htmlFor="game-input" className={styles.game_input}>
                <span>Quem é esse Pokémon ?</span>
                <CustomInput
                    id="game-input"
                    placeholder="Digite o nome do Pokémon"
                    icon={<BsArrowRight />}
                    submitFunction={handleGuessPokemon}
                />
            </label>
            <div className={styles.btn_container}>
                <div className={styles.hint_container}>
                    <button
                        onClick={() => handleHint(pokemon!.name)}
                        ref={btnRef}
                    >
                        Dica
                    </button>
                    <span className={styles.hint} ref={hintRef}>
                        Dica: "{hint}"
                    </span>
                </div>
                <button onClick={() => handleStart()} id="draw-anohter-btn">
                    Sortear outro
                </button>
                <button onClick={() => openModal("generations-modal")}>
                    Escolher Gerações
                </button>
            </div>
        </div>
    );
};

export default GameInterface;
