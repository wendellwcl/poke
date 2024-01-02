import { useRef, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsList } from "react-icons/bs";

//Assets
import logo from "../../assets/images/Logo.png";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Styles
import styles from "./styles/Header.styles.module.css";

const Header = () => {
    const navRef = useRef<HTMLElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);

    const { headerBg } = useContext(HeaderBgContext);

    //Toggle nav display (mobile)
    function toggleNav() {
        navRef.current!.classList.toggle(styles.show);
        fadeRef.current!.classList.toggle(styles.show);
    }

    //Close nav
    function closeNav() {
        navRef.current!.classList.remove(styles.show);
        fadeRef.current!.classList.remove(styles.show);
    }

    //Close nav on window resize
    //Without this function the 'fade' element may appear in an unwanted way
    useEffect(() => {
        function handleCloseNav() {
            if (window.innerWidth >= 767) {
                closeNav();
            }
        }

        window.addEventListener("resize", handleCloseNav);

        //Clean up function
        return () => window.removeEventListener("resize", handleCloseNav);
    }, []);

    return (
        <>
            <header className={`${styles.header} ${headerBg}`}>
                <h1 className={styles.logo}>
                    <NavLink to="/" onClick={closeNav}>
                        <img src={logo} alt="pokemon logo" />
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
                            <NavLink to="/about" onClick={closeNav}>
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
