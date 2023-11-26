import { useContext, useEffect } from "react";
import { BsGithub, BsDatabase } from "react-icons/bs";

//Contexts
import { HeaderBgContext } from "../../contexts/HeaderBgContext";

//Components
import AboutItem from "./components/AboutItem";

//Assets
import pokeball from "../../assets/svg/ball.svg";

//Styles
import styles from "./styles/styles.module.css";

const About = () => {
    const { setHeaderBg } = useContext(HeaderBgContext);

    //Changing Header background
    useEffect(() => {
        setHeaderBg("color");
    }, []);

    return (
        <div className={styles.about_container}>
            <AboutItem
                title="Projeto criado por:"
                subtitle="Wendellwcl"
                link="https://github.com/wendellwcl"
                icon={<BsGithub />}
            />
            <AboutItem
                title="Repositório do projeto:"
                subtitle="Poke"
                link="https://github.com/wendellwcl/poke"
                icon={<img src={pokeball} />}
            />
            <AboutItem
                title="API utilizada:"
                subtitle="PokéAPI"
                link="https://pokeapi.co/"
                icon={<BsDatabase />}
            />
        </div>
    );
};

export default About;
