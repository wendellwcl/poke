import Greetings from "./components/Greetings";
import Carousel from "./components/Carousel";

import styles from "./styles/styles.module.css";

const FrontPage = () => {
    return (
        <section className={styles.frontPage_container}>
            <Greetings myClassName={styles.greetings_container} />
            <Carousel myClassName={styles.carousel_container} />
        </section>
    );
};

export default FrontPage;
