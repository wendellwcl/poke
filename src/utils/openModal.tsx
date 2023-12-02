function openModal(modalId: string) {
    try {
        const modalEl = document.querySelector(`#${modalId}`);

        if (!modalEl) {
            throw "The requested modal does not exist, please enter a valid id";
        } else {
            modalEl!.classList.add("show");
        }
    } catch (e) {
        throw new Error(`${e}`);
    }
}

export default openModal;
