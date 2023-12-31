import { useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";

//Components
import CustomInput from "../../../../components/CustomInput/CustomInput";

//Custom Hooks
import useModal from "../../../../hooks/useModal";

//Interfaces
import { IPokemon } from "../../../../Interfaces/interfaces";

//Styles
import styles from "./styles/GameInterface.styles.module.css";

interface Props {
    handleStartGame: () => void;
    handleGuessPokemon: (
        playerAnswer: string,
        handleInputValue: (value: React.SetStateAction<string>) => void
    ) => void;
    pokemon: IPokemon;
}

const GameInterface = ({
    handleStartGame,
    handleGuessPokemon,
    pokemon,
}: Props) => {
    const { openModal } = useModal();

    const btnRef = useRef<HTMLButtonElement | null>(null);
    const hintRef = useRef<HTMLSpanElement | null>(null);

    const [hint, setHint] = useState<string>("");

    //Give the player a hint
    const handleHint = (name: string) => {
        //Handle hint
        let hint: string | string[] = Array.from(name);
        hint = hint.fill("_", 2);
        hint = hint.join(" ");
        setHint(hint);

        //Show hint
        btnRef.current!.style.display = "none";
        hintRef.current!.style.display = "block";

        //Focus input
        const inputEl = document.querySelector(
            "#game-input"
        ) as HTMLInputElement;
        inputEl.focus();
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
                        onClick={() => handleHint(pokemon.name)}
                        ref={btnRef}
                    >
                        Dica
                    </button>
                    <span className={styles.hint} ref={hintRef}>
                        Dica: "{hint}"
                    </span>
                </div>
                <button onClick={() => handleStartGame()} id="draw-anohter-btn">
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
