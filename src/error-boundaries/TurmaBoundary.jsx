import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function TurmaBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return <h2 style={{marginLeft: "18rem"}}>Oops... Essa turma não foi encontrada 😪</h2>
            case 401:
                return <h2 style={{marginLeft: "18rem"}}>Você não está autorizado a ver essa página</h2>;
            case 400:
                return <h2 style={{marginLeft: "18rem"}}>Parece que algo deu errado na requisição</h2>;
            case 500:
                return <h2 style={{marginLeft: "18rem"}}>Erro interno no servidor</h2>;
        }
    }

    return <h2>Algo deu errado.</h2>
}