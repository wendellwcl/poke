function guessPokemon(
    pokemonName: string,
    playerAnswer: string,
    handleInputValue: React.Dispatch<React.SetStateAction<string>>
) {
    const result = pokemonName === playerAnswer ? true : false;

    if (result) {
        document.querySelector("#pokemon-display")!.classList.add("show");
        (
            document.querySelector("#draw-anohter-btn") as HTMLButtonElement
        ).focus();
    } else {
        handleInputValue("");
    }
}

export default guessPokemon;
