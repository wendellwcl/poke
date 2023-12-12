import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

//Contexts
import HeaderBgContextProvider from "./contexts/HeaderBgContext.tsx";
import GameContextProvider from "./contexts/GameContext/GameContext.tsx";

//Pages
import App from "./App.tsx";
import FrontPage from "./pages/FrontPage/FrontPage.tsx";
import Game from "./pages/Game/Game.tsx";
import Pokedex from "./pages/Pokedex/Pokedex.tsx";
import About from "./pages/About/About.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";

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
            {
                path: "/error",
                element: <ErrorPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HeaderBgContextProvider>
            <GameContextProvider>
                <RouterProvider router={router} />
            </GameContextProvider>
        </HeaderBgContextProvider>
    </React.StrictMode>
);
