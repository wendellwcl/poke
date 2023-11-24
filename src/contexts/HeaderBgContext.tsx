//This Context is responsible for controlling the background of the Header component according to the needs of each page
//'transparent' sets the Header background tranparent
//'color' sets the Header background as its default color

import { createContext, useState } from "react";

interface Props {
    children: React.ReactNode;
}

interface IHeaderBgContextValue {
    headerBg: string;
    setHeaderBg: React.Dispatch<React.SetStateAction<headerBg>>;
}

type headerBg = "transparent" | "color";

export const HeaderBgContext = createContext<IHeaderBgContextValue>({
    headerBg: "transparent",
    setHeaderBg: () => {},
});

const HeaderBgContextProvider = ({ children }: Props) => {
    const [headerBg, setHeaderBg] = useState<headerBg>("transparent");

    const contextValue: IHeaderBgContextValue = {
        headerBg,
        setHeaderBg,
    };

    return (
        <HeaderBgContext.Provider value={contextValue}>
            {children}
        </HeaderBgContext.Provider>
    );
};

export default HeaderBgContextProvider;
