import DataTable from "react-data-table-component";
import { useRef, useState, useEffect } from "react";
import generatePDF, { Margin } from 'react-to-pdf';
import axios from 'axios';

export default function Turma() {
    const [turma, setTurma] = useState({});
    const [showFazerChamada, setShowFazerChamada] = useState(false);
    const [professores, setProfessores] = useState([]);
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const responseTurma = await axios.get('https://backend-delta-neon.vercel.app/turma', { headers: { 'Access-Control-Allow-Origin': '*' } });
            setTurma(responseTurma.data);
    
            const responseAno = await axios.get('https://backend-delta-neon.vercel.app/ano', { headers: { 'Access-Control-Allow-Origin': '*' } });
            setProfessores(responseAno.data);
    
            const responseAlunos = await axios.get('https://backend-delta-neon.vercel.app/aluno', { headers: { 'Access-Control-Allow-Origin': '*' } });
            setAlunos(responseAlunos.data);
        } catch (error) {
            console.error('Erro ao buscar dados do backend:', error);
        }
    };
    
    const handleSelect = (ev) => {
        localStorage.setItem("presence-pro-professorSelecionado", JSON.stringify(ev.target.value));
    };

    const handleShowFazerChamada = (condition) => {
        setShowFazerChamada(condition);
    };

    const contentPDF = useRef();

    const columns = [
        {
            name: 'Nome',
            selector: row => row.nome,
            sortable: true
        },
        {
            name: 'Matrícula',
            selector: row => row.matricula,
            sortable: true
        },
        {
            name: 'N° de presença',
            selector: row => row.nPresenca,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true
        },
        {
            name: 'Contato do Responsável',
            selector: row => row.contatoResponsavel,
            sortable: true
        }
    ];
    
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
    };

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

    return (
        <div className="turmaContainer">
            {showFazerChamada ? (
                <>
                    <div className="turmaTitle">
                        <h1>TURMAS - {turma.name}</h1>
                        <select name="select" defaultValue="default" onChange={handleSelect}>
                            <option value="default" disabled>Selecione o Prof</option>
                            {professores.map(professor => (
                                <option key={professor.id} value={professor.id}>{professor.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="turmaTable">
                        <DataTable
                            columns={columns}
                            data={alunos}
                            selectableRows
                            customStyles={customStyles}
                        />
                    </div>
                    
                    <div className="turmaFooter">
                        <button>Salvar</button>
                        <button onClick={() => handleShowFazerChamada(false)}>Cancelar</button>
                    </div>
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
                            data={alunos}
                            customStyles={customStyles}
                        />
                    </div>
                </>
            )}
        </div>        
    );
}
