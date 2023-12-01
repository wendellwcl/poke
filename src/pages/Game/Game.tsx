import { useEffect, useContext } from "react";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Styles
import styles from "./styles/Game.styles.module.css";

const Game = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("transparent");
    }, []);

    return (
        <div className={styles.game_container}>
            <div className="left_container">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. A,
                nesciunt. Deleniti, hic esse blanditiis facere fugiat debitis
                aut sunt voluptatibus adipisci exercitationem numquam
                doloremque, placeat corrupti rem distinctio quisquam quaerat.
            </div>
            <div className="right_container">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                mollitia reprehenderit aperiam distinctio numquam iste, ut
                provident doloribus quia atque tenetur nam excepturi esse
                dignissimos qui earum, accusantium at sint!
            </div>
        </div>
    );
};

export default Game;
