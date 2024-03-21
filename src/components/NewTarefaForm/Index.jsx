import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

NewTarefaForm.propTypes = {
    showForm: PropTypes.bool,
    handleShowForm: PropTypes.func,
    addTarefa: PropTypes.func
}


export default function NewTarefaForm({ showForm, handleShowForm, addTarefa }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    const handleSubmit = (ev) => {
        ev.preventDefault();
        addTarefa({ title, description });

        // Limpa o valor dos inputs
        setTitle("");
        setDescription("");
        handleShowForm(false);
    }

    return (
        <>
            {showForm ? (
                <div className={styles.tarefaFormContainer}>
                    <form className={styles.tarefaForm} onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Título"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}    
                        />

                        <input 
                            type="text" 
                            placeholder="Descrição"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}    
                        />

                        <div className={styles.buttons}>
                            <button className={styles.saveBtn} type="submit">Salvar</button>
                            <button className={styles.cancelBtn} onClick={() => handleShowForm(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            ) : null}
        </>
    )
}