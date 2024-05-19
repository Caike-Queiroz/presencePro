import { useState, useEffect } from "react";
import axios from 'axios';

export default function Turma() {
    const [turmas, setTurmas] = useState([]);
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);
    const [alunosTurmaSelecionada, setAlunosTurmaSelecionada] = useState([]);
    const [showFazerChamada, setShowFazerChamada] = useState(false);
    const [alunosComPresenca, setAlunosComPresenca] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchTurmas = async () => {
            try {
                const response = await axios.get("https://backend-ppds.vercel.app/turmas");
                console.log('Dados das turmas recebidos com sucesso:', response.data);
                setTurmas(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados das turmas:', error);
            }
        };

        fetchTurmas();
    }, []);

    const handleTurmaSelecionada = async (idTurmaSelecionada) => {
        try {
            if (!idTurmaSelecionada) {
                console.error('ID da turma não fornecido.');
                return;
            }

            console.log(`Buscando dados da turma com ID ${idTurmaSelecionada}...`);
            const responseTurma = await axios.get(`https://backend-ppds.vercel.app/turmas/${idTurmaSelecionada}`);
            console.log('Dados da turma recebidos com sucesso:', responseTurma.data);
            setTurmaSelecionada(responseTurma.data);

            console.log(`Buscando alunos da turma com ID ${idTurmaSelecionada}...`);
            const responseAlunos = await axios.get(`https://backend-ppds.vercel.app/turmas/${idTurmaSelecionada}/aluno`);
            console.log('Dados dos alunos da turma recebidos com sucesso:', responseAlunos.data);
            setAlunosTurmaSelecionada(responseAlunos.data.map(aluno => ({ ...aluno })));
            setAlunosComPresenca([]); // Resetar a lista de presença ao selecionar nova turma
            setShowFazerChamada(true); // Exibe automaticamente a chamada ao selecionar a turma
            setSelectAll(false); // Resetar o checkbox pai
        } catch (error) {
            console.error('Erro ao buscar dados do backend:', error);
        }
    };

    const handleCheckboxChange = (matricula) => {
        setAlunosComPresenca(prevState => {
            if (prevState.includes(matricula)) {
                return prevState.filter(m => m !== matricula);
            } else {
                return [...prevState, matricula];
            }
        });
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setAlunosComPresenca([]);
        } else {
            setAlunosComPresenca(alunosTurmaSelecionada.map(aluno => aluno.matricula));
        }
        setSelectAll(!selectAll);
    };

    const handleSaveChamada = async () => {
        try {
          if (!turmaSelecionada) {
            console.error('Nenhuma turma selecionada.');
            return;
          }
      
          for (const aluno of alunosTurmaSelecionada) {
            const presente = alunosComPresenca.includes(aluno.matricula);
            const novaPresenca = presente ? aluno.npresenca + 1 : aluno.npresenca;
      
            console.log(`Salvando chamada para aluno ${aluno.nome}...`);
      
            const response = await axios.put(`https://backend-ppds.vercel.app/turma/${aluno.matricula}`, {
              matricula: aluno.matricula,
              npresenca: novaPresenca
            });
      
            if (response.status === 200) {
              console.log(`Chamada salva para aluno ${aluno.nome} com sucesso!`);
            } else {
              console.error(`Erro ao salvar a chamada para aluno ${aluno.nome}. Status: ${response.status}`);
            }
          }
      
          setShowFazerChamada(false);
        } catch (error) {
          console.error('Erro ao salvar a chamada:', error);
        }
      };
      

    return (
        <div className="turmaContainer">
            {showFazerChamada ? (
                <>
                    <div className="turmaTitle">
                        <h1>TURMAS - {turmaSelecionada?.nome}</h1>
                    </div>

                    <div className="turmaTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAllChange}
                                        />
                                    </th>
                                    <th>Matrícula</th>
                                    <th>Nome</th>
                                    <th>Presenças</th>
                                    <th>Status</th>
                                    <th>Contato do Responsável</th>
                                    <th>ID da Turma</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alunosTurmaSelecionada.map(aluno => (
                                    <tr key={aluno.matricula}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={alunosComPresenca.includes(aluno.matricula)}
                                                onChange={() => handleCheckboxChange(aluno.matricula)}
                                            />
                                        </td>
                                        <td>{aluno.matricula}</td>
                                        <td>{aluno.nome}</td>
                                        <td>{aluno.npresenca}</td>
                                        <td>{aluno.status}</td>
                                        <td>{aluno.contatoresponsavel}</td>
                                        <td>{aluno.id_turma}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="turmaFooter">
                        <button onClick={handleSaveChamada}>Salvar</button>
                        <button onClick={() => setShowFazerChamada(false)}>Cancelar</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="turmaTitle">
                        <h1>Selecione uma Turma</h1>
                    </div>

                    <div className="turmaList">
                        <ul>
                            {turmas.map((turma) => (
                                <li key={turma.id_turma}>
                                    <button onClick={() => handleTurmaSelecionada(turma.id_turma)}>{turma.nome}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
