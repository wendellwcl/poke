import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Styles
import styles from "./styles/ErrorPage.styles.module.css";

const ErrorPage = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("color");
    }, []);

    return (
        <div className={styles.errorPage_container}>
            <div className={styles.error_msg}>
                <span className={styles.oops}>Oops!</span>
                <span>
                    Algo inesperado aconteceu. Tente novamente mais tarde.
                </span>
            </div>
            <Link to="/">Página inicial</Link>
        </div>
    );
};

export default ErrorPage;
