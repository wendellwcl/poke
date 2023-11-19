import { useRef, useEffect } from "react";
import { BsList } from "react-icons/bs";
import { NavLink } from "react-router-dom";

import styles from "./styles/styles.module.css";

const Header = () => {
    const navRef = useRef<HTMLElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);

    function toggleNav() {
        navRef.current!.classList.toggle(styles.show);
        fadeRef.current!.classList.toggle(styles.show);
    }

    function closeNav() {
        navRef.current!.classList.remove(styles.show);
        fadeRef.current!.classList.remove(styles.show);
    }

    useEffect(() => {
        function handleCloseNav() {
            if (window.innerWidth >= 767) {
                closeNav();
            }
        }

        window.addEventListener("resize", handleCloseNav);

        return () => window.removeEventListener("resize", handleCloseNav);
    }, []);

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.logo}>
                    <NavLink to="/" onClick={closeNav}>
                        <img src="/Pokemon_logo.svg" alt="pokemon logo" />
                    </NavLink>
                </h1>
                <nav className={styles.nav} ref={navRef}>
                    <ul>
                        <li>
                            <NavLink to="/game" onClick={closeNav}>
                                Quem é esse Pokémon ?
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/pokedex" onClick={closeNav}>
                                Pokédex
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/sobre" onClick={closeNav}>
                                Sobre
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <button className={styles.menu_btn} onClick={toggleNav}>
                    <BsList />
                </button>
            </header>
            <div
                ref={fadeRef}
                className={styles.fade}
                onClick={toggleNav}
            ></div>
        </>
    );
};

export default Header;
