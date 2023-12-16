function guessPokemon(
    pokemonName: string,
    playerAnswer: string,
    handleInputValue: (value: React.SetStateAction<string>) => void
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
