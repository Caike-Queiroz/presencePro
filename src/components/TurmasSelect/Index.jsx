import { useState } from "react";
import styles from "./styles.module.css"
import { Link } from "react-router-dom";
import escola from "../../database.json";


export default function TurmasSelect() {
    const [ano, setAno] = useState('');

    const options = [
        {label: "1° ano", value: 1},
        {label: "2° ano", value: 2},
        {label: "3° ano", value: 3},
        {label: "4° ano", value: 4},
        {label: "5° ano", value: 5},
    ]

    const handleSelect = (ev) => {
        setAno(ev.target.value);
        localStorage.setItem("presence-pro-anoSelecionado", JSON.stringify(ev.target.value));
    }

    const handleLink = (ev) => {
        const path = String(ev.target.href);
        const match = path.match(/[ABCDE]$/);
        const serie = match ? match[0] : null;
        localStorage.setItem("presence-pro-serieSelecionada", JSON.stringify(serie));
    } 

    return (
        <div className={styles.turmasSelectContainer}>
            <div className={styles.selectAno}>
                <h1>ANO</h1>

                <select name="select" defaultValue="default" onChange={handleSelect}>
                    <option value="default" disabled>Selecione o ano</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                
            </div>
            
            <div className={styles.turmasList}>
                {ano !== '' ? 
                (  
                    escola[ano-1].turmas.map((turma) => (
                        <div key={turma.id} className={styles.turma} >
                            <Link 
                                className={styles.turmaLink}
                                onClick={handleLink} 
                                to={`/turmas/${turma.id}`}
                            >
                                Turma {turma.name}
                            </Link>
                        </div>
                    ))

                ) : null}
            </div>
            
        </div>
    )
}