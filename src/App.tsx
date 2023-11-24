import { Outlet } from "react-router-dom";

//Components
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default App;
