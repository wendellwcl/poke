import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

//Contexts
import HeaderBgContextProvider from "./contexts/HeaderBgContext.tsx";
import PokemonListContextProvider from "./contexts/PokemonListContext.tsx";

//Pages
import App from "./App.tsx";
import FrontPage from "./pages/FrontPage/index.tsx";
import Pokedex from "./pages/Pokedex/index.tsx";
import About from "./pages/About/index.tsx";

//Styles
import "normalize.css";
import "./index.css";

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <FrontPage />,
            },
            {
                path: "/game",
                element: <div>Quem é esse Pokémon ?</div>,
            },
            {
                path: "/pokedex",
                element: <Pokedex />,
            },
            {
                path: "/about",
                element: <About />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HeaderBgContextProvider>
            <PokemonListContextProvider>
                <RouterProvider router={router} />
            </PokemonListContextProvider>
        </HeaderBgContextProvider>
    </React.StrictMode>
);
