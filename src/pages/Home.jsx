import { useState } from "react";
import NewTarefaForm from "../components/NewTarefaForm/Index";
import useTarefaCollection from "../hooks/useTarefaCollection";
import PropTypes from "prop-types";
// import { CalendarComponent } from "@syncfusion/ej2-react-calendars";

Home.propTypes = {
    tarefas: PropTypes.array,
    title: PropTypes.string,
    description: PropTypes.string
}

export default function Home() {
    const { tarefas, addTarefa, removeTarefa, observacoesContent, saveObservacoesContent } = useTarefaCollection();

    const [showTarefaForm, setShowTarefaForm] = useState(false);

    const handleShowTarefaForm = (condition) => {
        setShowTarefaForm(condition);
    }

    const handleChange = (content) => {
        saveObservacoesContent(content);
    }

    return (
        <div className="container">
        
            {/* Lista de tarefas */}
            <article>
                <div className='toDoList'>
                    <h4>Lista de tarefas</h4>

                    <button 
                        className='addButton'
                        onClick={() => handleShowTarefaForm(true)}
                    >
                        <img src="./src/assets/addButton.png" alt="add button" /><b>Nova tarefa</b>
                    </button>
                </div>
                
                { showTarefaForm ? 
                    <NewTarefaForm 
                        showForm={showTarefaForm} 
                        handleShowForm={handleShowTarefaForm}
                        addTarefa={addTarefa}
                    /> 
                : null }

                {tarefas.length > 0 ? 
                    tarefas.map((tarefa) => (
                        <div key={tarefa.id} className='tarefaContainer'>
                            <div className='tarefaContent'>
                                <h4 className="tarefaTitle">{tarefa.title}</h4>

                                <button className='editBtn' onClick={() => removeTarefa(tarefa.id)}>X</button>
                            </div>

                            <span className="tarefaDescription">{tarefa.description}</span>
                        </div>

                    )) : <div style={{marginTop: "2rem", fontSize: "1.015rem", fontFamily: "Roboto"}}> 
                            <span>Adicione tarefas para você não esquece-las !</span> 
                        </div> 
                }
            </article>

            {/* Observações */}
            <textarea 
                name="observacoes" 
                id="observacoes" 
                placeholder="Digite aqui as suas observações"
                value={observacoesContent.content}
                onChange={(ev) => handleChange(ev.target.value)}
            ></textarea>
            {/* Calendário */}
            {/* <CalendarComponent/> */}

        </div>
    )
}