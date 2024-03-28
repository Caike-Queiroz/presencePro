import styles from "./styles.module.css"

export default function ConfiguracoesFont() {
    return (
        <div className={styles.containerConfig}>
            <div className={styles.select}>
                <label htmlFor="font">Selecionar Tamanho da Fonte</label>

                <select 
                    name="font"
                    id="font"
                    // value={font}
                >
                    <option value="normal">Normal</option>
                    <option value="grande">Grande</option>
                </select>
            </div>
        </div>
    )
}