import { useRef } from "react";
import { BsX } from "react-icons/bs";

//Styles
import styles from "./styles/Modal.styles.module.css";

interface Props {
    children: React.ReactNode;
    title: string;
    modalId: string;
}

const Modal = ({ children, title, modalId }: Props) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    function closeModal() {
        const modalEl = modalRef.current;
        modalEl!.classList.remove("show");
    }

    return (
        <div className={styles.modal_container} id={modalId} ref={modalRef}>
            <div className={styles.modal_fade} onClick={closeModal}></div>
            <div className={styles.modal_element}>
                <div className={styles.modal_header}>
                    <h5 className={styles.modal_title}>{title}</h5>
                    <div className={styles.close_btn_container}>
                        <svg
                            id="corner"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 80 64"
                            className={styles.corner_svg}
                        >
                            <path d="M80,64H23.81a10,10,0,0,1-9.7-7.57L0,0H80Z" />
                        </svg>
                        <button
                            className={styles.close_btn}
                            onClick={closeModal}
                        >
                            <BsX />
                        </button>
                    </div>
                </div>
                <div className={styles.modal_body}>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
