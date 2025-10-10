import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            title: 'First Todo.',
            createdAt: new Date().toLocaleString(),
            lastUpdateAt: new Date().toLocaleString(),
            isCompleted: false,
            isPinned: false,
            isDeleted: false,
        },
    ],
    addTodo: (note) => { },
    UpdateTodo: (id, updatedTodo) => { },
    softDelTodo: (id) => { },
    permanentDelTodo: (id) => { },
    recycleBinTodo: (id) => { },
    openForm: (note) => { },
    closeForm: () => { },
    restoreNote: (id) => { },
    togglePin: (id) => { },
});



export const UseTodo = () => {
    return useContext(TodoContext);
}


