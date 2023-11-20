import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

import HeaderBgContextProvider from "./contexts/HeaderBgContext.tsx";

import App from "./App.tsx";
import FrontPage from "./pages/FrontPage/index.tsx";
import Pokedex from "./pages/Pokedex/index.tsx";

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
                path: "/sobre",
                element: <div>Sobre</div>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HeaderBgContextProvider>
            <RouterProvider router={router} />
        </HeaderBgContextProvider>
    </React.StrictMode>
);
