import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Turmas from "./pages/Turmas";
import Turma from "./pages/Turma";
import Configuracoes from "./pages/Configuracoes";

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
            path: "turmas/:turmaid",
            element: <Turma/>
        },
        {
            path: "configuracoes",
            element: <Configuracoes/>    
        }]
    }
])

export default router;