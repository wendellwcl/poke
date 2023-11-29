//Assets
import pokeball from "../../assets/svg/ball.svg";

//Styles
import styles from "./styles/LoadingScreen.styles.module.css";

const LoadingScreen = () => {
    return (
        <div className={styles.loading_container}>
            <img src={pokeball} className={styles.loading_img} />
        </div>
    );
};

export default LoadingScreen;
