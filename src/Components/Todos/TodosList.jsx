
import { UseTodo } from "../../Context/TodosContext";
import TodoCard from "./TodosCard";
import { LuInbox } from "react-icons/lu";

function TodoList({ activeFolder, searchInput }) {
    const { todos } = UseTodo();

    const filteredTodos = todos.filter(todo => {
        const matchSearch = todo.title?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()) ||
            todo.content?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());

        if (activeFolder === "All Notes") return !todo.isDeleted && matchSearch;
        if (activeFolder === "Pinned Notes") return todo.isPinned && !todo.isDeleted && matchSearch;
        if (activeFolder === "Locked Notes") return todo.isLocked && !todo.isDeleted && matchSearch;
        if (activeFolder === "Recycle Bin") return todo.isDeleted && matchSearch;
        return !todo.isDeleted && matchSearch;
    });

    if (filteredTodos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600 animate-fadeIn">
                <LuInbox className="text-6xl mb-3 text-gray-500" />
                <p className="font-semibold text-lg">No notes found in {activeFolder}.</p>
                <p className="text-sm text-gray-400 mt-1">Try creating or restoring some notes.</p>
            </div>
        );
    }

    return (

        <div key={activeFolder}
            className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 p-1 overflow-y-auto rounded-md animate-fadeIn scrollbar-hide">

            {filteredTodos.map(todo => (
                <TodoCard
                    key={todo.id}
                    note={todo}
                    isRecycleBin={activeFolder === "Recycle Bin"}
                />
            ))}
        </div>

    );
}

export default TodoList;
