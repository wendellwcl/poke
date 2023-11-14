import { useRef } from "react";
import { BsList } from "react-icons/bs";

import styles from "./styles/styles.module.css";

const Header = () => {
    const navRef = useRef<HTMLElement>(null);

    function toggleNav() {
        navRef.current!.classList.toggle("show");
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <a href="#">
                    <img src="/Pokemon_logo.svg" alt="pokemon logo" />
                </a>
            </h1>
            <nav className={styles.nav} ref={navRef}>
                <ul>
                    <li>
                        <a href="#">Quem é esse?</a>
                    </li>
                    <li>
                        <a href="#">Pokédex</a>
                    </li>
                    <li>
                        <a href="#">Sobre</a>
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
