import { useRef } from "react";
import { BsList } from "react-icons/bs";
import { NavLink } from "react-router-dom";

import styles from "./styles/styles.module.css";

const Header = () => {
    const navRef = useRef<HTMLElement>(null);

    function toggleNav() {
        navRef.current!.classList.toggle("show");
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <NavLink to="/">
                    <img src="/Pokemon_logo.svg" alt="pokemon logo" />
                </NavLink>
            </h1>
            <nav className={styles.nav} ref={navRef}>
                <ul>
                    <li>
                        <NavLink to="/game">Quem é esse Pokémon ?</NavLink>
                    </li>
                    <li>
                        <NavLink to="/pokedex">Pokédex</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sobre">Sobre</NavLink>
                    </li>
                </ul>
            </nav>
            <button className={styles.menu_btn} onClick={toggleNav}>
                <BsList />
            </button>
        </header>
    );
};

export default Header;
