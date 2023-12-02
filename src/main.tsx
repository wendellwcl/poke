import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

//Contexts
import HeaderBgContextProvider from "./contexts/HeaderBgContext.tsx";
import PokemonListContextProvider from "./contexts/PokemonListContext.tsx";
import GameContextProvider from "./contexts/GameContext/GameContext.tsx";

//Pages
import App from "./App.tsx";
import FrontPage from "./pages/FrontPage/FrontPage.tsx";
import Game from "./pages/Game/Game.tsx";
import Pokedex from "./pages/Pokedex/Pokedex.tsx";
import About from "./pages/About/About.tsx";

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
                element: <Game />,
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
                <GameContextProvider>
                    <RouterProvider router={router} />
                </GameContextProvider>
            </PokemonListContextProvider>
        </HeaderBgContextProvider>
    </React.StrictMode>
);
