import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Styles
import styles from "./styles/NotFoundPage.styles.module.css";

const NotFoundPage = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("color");
    }, []);

    return (
        <div className={styles.notFound_container}>
            <div className={styles.notFound_msg}>
                <span className={styles.emphasis}>404</span>
                <span>
                    O recurso que você está procurando não foi encontrado.
                </span>
            </div>
            <Link to="/">Página inicial</Link>
        </div>
    );
};

export default NotFoundPage;
