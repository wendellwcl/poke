import { useContext, useState, FormEvent } from "react";
import { BsSearch } from "react-icons/bs";

//Contexts
import { PokemonListContext } from "../../../../contexts/PokemonListContext";

//Interfaces
import { IPokemonShort } from "../../../../Interfaces/interfaces";

//Styles
import styles from "./styles/SearchBar.styles.module.css";

interface Props {
    handleSetLoading: (value: boolean) => void;
    handleSetPokedexArrBySearch: (results: IPokemonShort[]) => void;
}

const SearchBar = ({
    handleSetLoading,
    handleSetPokedexArrBySearch,
}: Props) => {
    const { pokemonList } = useContext(PokemonListContext);

    const [searchInputValue, setSearchInputValue] = useState<string>("");

    async function handleSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (searchInputValue != "") {
            handleSetLoading(true);

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
                    handleSetPokedexArrBySearch([
                        {
                            name: res.name,
                            url: `https://pokeapi.co/api/v2/pokemon/${res.id}/`,
                        },
                    ])
                )
                .catch((err) => {
                    handleSetPokedexArrBySearch([]);
                    handleSetLoading(false);
                    throw new Error(err);
                });

            handleSetLoading(false);
        }
    }

    return (
        <div className={styles.search_bar}>
            <form onSubmit={(e) => handleSearch(e)}>
                <div className={styles.search_input}>
                    <input
                        type="text"
                        placeholder="Buscar Pokémon"
                        value={searchInputValue}
                        onChange={(e) =>
                            setSearchInputValue(e.currentTarget.value)
                        }
                        list="pokemonNames"
                    />
                    <datalist id="pokemonNames">
                        {pokemonList.map((pokemon) => (
                            <option value={pokemon.name} key={pokemon.name} />
                        ))}
                    </datalist>
                    <button type="submit">
                        <BsSearch />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
