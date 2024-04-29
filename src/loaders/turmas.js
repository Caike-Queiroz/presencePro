import escola from "../database.json";

export default function loadTurma({ params }) {

    const ano = Number(JSON.parse(localStorage.getItem("presence-pro-anoSelecionado")));

    const serieLetter = String(JSON.parse(localStorage.getItem("presence-pro-serieSelecionada")));

    var index;

    switch(serieLetter) {
        case 'A':
            index = 0;
            break;
        case 'B':
            index = 1;
            break;
        case 'C':
            index = 2;
            break;
        case 'D':
            index = 3;
            break;
        case 'E':
            index = 4;
            break;
        default:
            console.log("Última letra não reconhecida.");
            break;
    }

    console.log(index);

    const serie = escola[ano-1].turmas.findIndex((turma) => turma.id === String(params.turmaId));

    const turma = escola[ano-1].turmas[serie];

    if(!turma) {
        throw new Response("404 Not found", {status: 404});
    }

    return turma;
}