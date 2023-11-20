import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";

import { IPokemonShort, IPokemon } from "../../../../Interfaces/interfaces";

import styles from "./styles/styles.module.css";
import { Link } from "react-router-dom";

interface Props {
    pokemon: IPokemonShort;
}

const PokedexCard = ({ pokemon }: Props) => {
    const [pokemonData, setPokemonData] = useState<IPokemon>();

    useEffect(() => {
        fetch(pokemon.url)
            .then((res) => res.json())
            .then((res) => setPokemonData(res));
    }, []);

    return (
        <>
            {pokemonData && (
                <Link to="/" className={styles.card_container}>
                    <div className={styles.img_container}>
                        <img
                            src={
                                pokemonData.sprites.other["official-artwork"]
                                    .front_default
                            }
                            alt={pokemonData.name}
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
                        <div className={styles.btn_container}>
                            <button className={styles.desktop_btn}>
                                Detalhes
                            </button>
                            <button className={styles.mobile_btn}>
                                <BsChevronRight />
                            </button>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default PokedexCard;
