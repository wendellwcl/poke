import { useEffect, useContext } from "react";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Components
import Greetings from "./components/Greetings/Greetings";
import Carousel from "./components/Carousel/Carousel";

//Styles
import styles from "./styles/FrontPage.styles.module.css";

const FrontPage = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("transparent");
    }, []);

    return (
        <section className={styles.frontPage_container}>
            <Greetings myClassName={"left_container"} />
            <Carousel myClassName={"right_container"} />
        </section>
    );
};

export default FrontPage;
