import { useState } from "react";

export default function useTarefaCollection() {

    const [tarefas, setTarefas] = useState(() => {

        const storedTarefas = localStorage.getItem("presence-pro-tarefas");
        if (!storedTarefas) return [];
        return JSON.parse(storedTarefas);
    });

    const addTarefa = ({title, description}) => {

        const id = Math.floor(Math.random() * 1000000);
        const tarefa = { id, title, description };
        setTarefas((state) => {
            const newState = [tarefa, ...state];
            localStorage.setItem("presence-pro-tarefas", JSON.stringify(newState));
            return newState;
        }) 
    }

    const removeTarefa = (id) => {
        
        let confirmacao = window.confirm(`Você deseja realmente excluir esta tarefa ? \nPressione "OK" para excluir esta tarefa\nPressione "Cancelar" para cancelar a exclusão desta tarefa `);

        if(confirmacao) {

            setTarefas((state) => {
                const newState = state.filter((tarefa) => tarefa.id !== id);
                localStorage.setItem("presence-pro-tarefas", JSON.stringify(newState));
                return newState;
            })
        }
    }

    const [observacoesContent, setObservacoesContent] = useState(() => {

        const storedObservacoesContent = localStorage.getItem("presence-pro-observacoes");
        if (!storedObservacoesContent) return [];
        return JSON.parse(storedObservacoesContent);
    });

    const saveObservacoesContent = (content) => {
        const date = new Date().toLocaleDateString();
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const lastUpdatedAt = `Ultima vez atualizado ${date} às ${hours}:${minutes}`;
        setObservacoesContent(() => {
            const newState = {content, lastUpdatedAt};
            localStorage.setItem("presence-pro-observacoes", JSON.stringify(newState));
            return newState;
        })
    }

    return { tarefas, addTarefa, removeTarefa, observacoesContent, saveObservacoesContent };
}