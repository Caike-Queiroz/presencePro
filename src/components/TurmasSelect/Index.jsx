import styles from "./styles.module.css"


export default function TurmasSelect() {
    return (
        <div className={styles.turmasSelectContainer}>
            <div className={styles.selectAno}>
                <h1>TURMAS</h1>

                <select name="select">
                    <option value="" selected disabled>Selecione o ano de 1 a 5</option>
                    <option value="1">1° ano</option>
                    <option value="2">2° ano</option>
                    <option value="3">3° ano</option>
                    <option value="4">4° ano</option>
                    <option value="5">5° ano</option>
                </select>
            
            </div>

            <div className={styles.turmasList}>
                <div className={styles.turma}>Turma 1°A</div>
                <div className={styles.turma}>Turma 1°B</div>
                <div className={styles.turma}>Turma 1°C</div>
                <div className={styles.turma}>Turma 1°D</div>
                <div className={styles.turma}>Turma 1°E</div>
            </div>

        </div>
    )
}