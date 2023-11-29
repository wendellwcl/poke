//Styles
import styles from "./styles/AboutItem.styles.module.css";

interface Props {
    title: string;
    subtitle: string;
    link: string;
    icon: any;
}

const AboutItem = ({ title, subtitle, link, icon }: Props) => {
    return (
        <div className={styles.about_item_container}>
            <span>
                {title}
                <br />
                <a href={link} target="_blank">
                    {icon} {subtitle}
                </a>
            </span>
        </div>
    );
};

export default AboutItem;
