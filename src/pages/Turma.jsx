import { useLoaderData } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useRef, useState } from "react";
import generatePDF, { Margin } from 'react-to-pdf';

export default function Turma() {

    // Traz os dados da turma selecionada
    const turma = useLoaderData();
    const [showFazerChamada, setShowFazerChamada] = useState(false);

    // Configurações da tabela
    const options = [
        {label: "Prof Katia - Matemática", value: 1},
        {label: "Prof Katia - Português", value: 2},
        {label: "Prof Katia - Artes", value: 3},
        {label: "Prof Katia - Ciências", value: 4},
        {label: "Prof Katia - História", value: 5},
        {label: "Prof Katia - Geografia", value: 6},
        {label: "Prof Carlos - Ed. Física", value: 7},
        {label: "Prof Igor - Inglês", value: 8}
    ]

    const columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
            sortable: true
        },
        {
            name: 'Matrícula',
            selector: row => row.matricula,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.matricula,
                    style: {
                        color: "#1784E7", // Azul
                    }
                },
            ]
        },
        {
            name: 'N° de presença',
            selector: row => row.nPresenca,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            conditionalCellStyles: [
                {
                    when: row => row.status === 'aprovado',
                    style: {
                        color: "#449D44", // Verde
                        textTransform: "capitalize"
                    }
                },
                {
                    when: row => row.status === 'reprovado',
                    style: {
                        color: "#FF4B4A", // Vermelho
                        textTransform: "capitalize",
                        // AZUL #1784E7
                    }
                }
            ]
        },
        {
            name: 'Contato do Responsável',
            selector: row => row.contatoResponsavel,
            sortable: true
        }
    ];
    
    // Dados da tabela
    const data = turma.alunos;

    const customStyles = {
        headCells: {
            style: {
                background: "#F1F3F9",
                color: "#495D72",
                fontWeight: "600",
                fontSize: "1em"
            }
        },
        rows: {
            style: {
                background: "#eee",
                color: "#495D72",
                fontSize: "1em"
            }
        },
    }

    const optionsPDF = {
        method: "open",
        page: {
            margin: Margin.SMALL,
            format: "A4",
            orientation: "landscape",
        },
        canvas: {
            mimeType: "image/png",
            qualityRatio: 1,
        },
        overrides: {
            pdf: {
                compress: true,
            },
            canvas: {
                useCORS: true,
            },
        },
    };

    const handleSelect = (ev) => {
        localStorage.setItem("presence-pro-professorSelecionado", JSON.stringify(ev.target.value));
    }

    const handleShowFazerChamada = (condition) => {
        setShowFazerChamada(condition);
        console.log('Clicou !');
    }

    const contentPDF = useRef();

    return (
        <div className="turmaContainer">
            { showFazerChamada ? (
                <>
                    <div className="turmaTitle">
                        <h1>TURMAS - {turma.name}</h1>
                        <select name="select" defaultValue="default" onChange={handleSelect}>
                            <option value="default" disabled>Selecione o Prof</option>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="turmaTable">
                        <DataTable
                            columns={columns}
                            data={data}
                            selectableRows
                            // pagination
                            customStyles={customStyles}
                        />
                    </div>
                    
                    <div className="turmaFooter">
                        <button>Salvar</button>
                        <button onClick={() => handleShowFazerChamada(false)}>Cancelar</button>
                    </div>
                    {/* <a href="mailto:caikequeiroz@gmail.com">caikequeiroz@gmail.com</a> */}
                </>
            ) : (
                <>
                    <div className="turmaTitle">
                        <h1>TURMAS - {turma.name}</h1>
                        <div className="buttons">
                            <button onClick={() => generatePDF(contentPDF, optionsPDF)}>Gerar relatório <img src="/./src/assets/download.png" alt="dark" /></button>
                            <button onClick={() => handleShowFazerChamada(true)}>Fazer chamada</button>
                        </div>
                    </div>

                    <div className="turmaTable" ref={contentPDF}>
                        <DataTable
                            columns={columns}
                            data={data}
                            // selectableRows
                            // pagination
                            customStyles={customStyles}
                        />
                    </div>

                    {/* <a href="mailto:caikequeiroz@gmail.com">caikequeiroz@gmail.com</a> */}
                </>
            )}
        </div>        
    )
}