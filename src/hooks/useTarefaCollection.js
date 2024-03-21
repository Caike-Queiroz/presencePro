import { useState } from "react";

export default function useGameCollection() {

    const [tarefas, setTarefas] = useState(() => {

        const storedTarefas = localStorage.getItem("tarefas-ppads");
        if (!storedTarefas) return [];
        return JSON.parse(storedTarefas);
    });

    const addTarefa = ({title, description}) => {

        const id = Math.floor(Math.random() * 1000000);
        const tarefa = { id, title, description };
        setTarefas((state) => {
            const newState = [tarefa, ...state];
            localStorage.setItem("tarefas-ppads", JSON.stringify(newState));
            return newState;
        }) 
    }

    const removeTarefa = (id) => {
        
        let confirmacao = window.confirm(`Você deseja realmente excluir esta tarefa ? \nPressione "OK" para excluir esta tarefa\nPressione "Cancelar" para cancelar a exclusão desta tarefa `);

        if(confirmacao) {

            setTarefas((state) => {
                const newState = state.filter((tarefa) => tarefa.id !== id);
                localStorage.setItem("tarefas-ppads", JSON.stringify(newState));
                return newState;
            })
        }
    }

    return { tarefas, addTarefa, removeTarefa };
}