//This hook has the necessary features to control Modal elements

const useModal = () => {
    function checkIfModalExistsAndTakeAction(
        modalId: string,
        callback: (modalEl: Element) => void
    ) {
        try {
            const modalEl = document.querySelector(`#${modalId}`);

            if (modalEl) {
                callback(modalEl);
            } else {
                throw "The requested modal does not exist, please enter a valid id";
            }
        } catch (e) {
            console.warn(e);
        }
    }

    function openModal(modalId: string) {
        checkIfModalExistsAndTakeAction(modalId, (modalEl) =>
            modalEl.classList.add("show")
        );
    }

    function closeModal(modalId: string) {
        checkIfModalExistsAndTakeAction(modalId, (modalEl) =>
            modalEl.classList.remove("show")
        );
    }

    return { openModal, closeModal };
};

export default useModal;
