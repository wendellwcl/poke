import { useNavigate } from "react-router-dom";

const useSearch = () => {
    const navigate = useNavigate();

    function handleSearch(
        value: string,
        handleInputValue: React.Dispatch<React.SetStateAction<string>>
    ) {
        handleInputValue("");
        navigate(`/results/${value}`);
    }

    return { handleSearch };
};

export default useSearch;
