import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Turmas from "./pages/Turmas";
import Turma from "./pages/Turma";
import TurmaBoundary from "./error-boundaries/TurmaBoundary";
import Configuracoes from "./pages/Configuracoes";
import loadTurma from "./loaders/turmas";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [{
            index: true,
            element: <Home/>
        },{
            path: "turmas",
            element: <Turmas/>
        },{
            path: "turmas/:turmaId",
            element: <Turma/>,
            loader: loadTurma,
            errorElement: <TurmaBoundary/>
        },
        {
            path: "configuracoes",
            element: <Configuracoes/>    
        }]
    }
])

export default router;