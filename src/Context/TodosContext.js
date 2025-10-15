import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            text: 'First Todo.',
            isCompleted: false,
            isPinned: false,
            isDeleted: false,
            createdAt: new Date().toLocaleString(),
            lastUpdateAt: new Date().toLocaleString(),
            completedAt: new Date().toLocaleString(),
        },
    ],

    addTodo: (todo) => { },
    UpdateTodo: (id, updatedTodo) => { },
    softDelTodo: (id) => { },
    permanentDelTodo: (id) => { },
    recycleBinTodo: (id) => { },
    openForm: (note) => { },
    closeForm: () => { },
    restoreTodo: (id) => { },
    togglePin: (id) => { },
    toggleComplete: (id) => { },

});



export const UseTodo = () => {
    return useContext(TodoContext);
}


