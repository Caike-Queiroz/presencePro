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
                    <option disabled value="">Selecionar Tamanho da Fonte</option>
                    <option value="font1">Grande</option>
                    <option value="font2">Média</option>
                    <option value="font3">Pequena</option>
                </select>
            </div>

            {/* Acredito que não precisa de botões de salvar e cancelar */}
            <div className={styles.buttons}>
                <div>
                    <button>Salvar</button>
                </div>
                <div>
                    <button>Cancelar</button>
                </div>
            </div>
        </div>
    )
}