import { useEffect, useState } from "react";

//Utils
import imgLoadingPlaceholder from "../../../../utils/imgLoadingPlaceholder";

//Interfaces
import { IPokemonShort, IPokemon } from "../../../../Interfaces/interfaces";

//Assets
import pokeball from "../../../../assets/svg/ball.svg";

//Styles
import styles from "./styles/styles.module.css";

interface Props {
    pokemon: IPokemonShort;
}

const PokedexCard = ({ pokemon }: Props) => {
    const [pokemonData, setPokemonData] = useState<IPokemon>();

    //Fetching data
    useEffect(() => {
        fetch(pokemon.url)
            .then((res) => res.json())
            .then((res) => setPokemonData(res));
    }, [pokemon]);

    return (
        <>
            {pokemonData && (
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

export default PokedexCard;
