import { useEffect, useState } from "react";

//Utils
import imgLoadingPlaceholder from "../../utils/imgLoadingPlaceholder";

//Interfaces
import { IPokemon } from "../../Interfaces/interfaces";

//Assets
import pokeball from "../../assets/svg/ball.svg";

//Styles
import styles from "./styles/PokeCard.styles.module.css";

interface Props {
    pokemonName: string;
    pokemonUrl: string;
}

const PokeCard = ({ pokemonName, pokemonUrl }: Props) => {
    const [pokemonData, setPokemonData] = useState<IPokemon>();
    const [loading, setLoading] = useState<boolean>(true);

    //Fetching data
    useEffect(() => {
        setLoading(true);

        fetch(pokemonUrl)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw `Error fetching Pokémon data (${pokemonName})`;
                }
            })
            .then((res) => setPokemonData(res))
            .finally(() => {
                setLoading(false);
            });
    }, [pokemonUrl]);

    return (
        <>
            {!loading && pokemonData && (
                <div className={styles.card_container}>
                    <div className={styles.img_container}>
                        <div className="loading_placeholder"></div>
                        <img
                            src={
                                pokemonData.sprites.other["official-artwork"]
                                    .front_default || pokeball
                            }
                            alt={pokemonData.name}
                            onLoad={(e) => {
                                imgLoadingPlaceholder(e.currentTarget);
                            }}
                            onError={(e) =>
                                imgLoadingPlaceholder(e.currentTarget)
                            }
                        />
                    </div>
                    <div className={styles.body_container}>
                        <div className={styles.infos_container}>
                            <span className={styles.name}>
                                {pokemonData.name}
                            </span>
                            <div className={styles.types}>
                                {pokemonData.types.map((item, index) => (
                                    <span
                                        key={index}
                                        className={styles.type_el}
                                        data-type={item.type.name}
                                    >
                                        {item.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PokeCard;
