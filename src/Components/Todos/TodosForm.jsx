
import { IoChevronBack } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { RiCloseFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { UseTodo } from "../../Context/TodosContext";
import TodoDetails from "./TodosDetails";

function TodoForm({ selectedTodo, closeForm }) {
    const { todos, UpdateTodo, addTodo, softDelTodo } = UseTodo();
    const [text, setText] = useState("");
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        if (selectedTodo) {
            setText(selectedTodo.text || "");
        } else {
            setText("");
        }
    }, [selectedTodo]);

    const currentTodo = selectedTodo
        ? todos.find((n) => n.id === selectedTodo.id) || selectedTodo
        : {
            id: "temp",
            text,
            isPinned: false,
            isDeleted: false,
            isCompleted: false,
            createdAt: new Date().toLocaleString(),
            lastUpdateAt: new Date().toLocaleString(),
        };

    const handleSave = () => {
        if (!text.trim()) return;

        if (selectedTodo) {
            UpdateTodo(selectedTodo.id, { text });
        } else {
            addTodo({
                id: Date.now(),
                text,
                createdAt: new Date().toLocaleString(),
                lastUpdateAt: new Date().toLocaleString(),
                isPinned: false,
                isDeleted: false,
            });
        }

        closeForm();
        setText("");
    };

    const handleDetailsToggle = (e) => {
        e.stopPropagation();
        setIsDetailsOpen(!isDetailsOpen);
    };

    const handleSoftDelete = (id) => {
        softDelTodo(id);
        closeForm();
    };

    return (
        <div className="absolute inset-0 top-0 left-0 w-full h-full bg-black/30 backdrop-blur-xs flex items-center justify-center z-50 animate-fadeIn">

            <RiCloseFill
                onClick={closeForm}
                className="max-[550px]:hidden absolute top-3 right-3 hover:scale-110 duration-200 cursor-pointer text-3xl text-gray-700 hover:text-red-500 transition-all"
            />

            <div className="relative bg-white backdrop-blur-xl border border-gray-200 w-[85%] max-w-2xl h-[80%] max-[550px]:w-[100%] max-[550px]:h-[100%] max-[550px]:rounded-none rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300">

                <div className="flex items-center justify-between p-2 border-b border-gray-200">
                    <IoChevronBack
                        onClick={closeForm}
                        className="cursor-pointer hover:scale-110 duration-200 text-2xl text-gray-900 hover:text-gray-500 transition-all"
                    />
                    <GiCheckMark
                        onClick={handleSave}
                        className="cursor-pointer hover:scale-110 duration-200 text-2xl text-[#6949c1] hover:purple-700 transition-all"
                    />
                </div>


                <div className="absolute top-17 right-6">
                    <BsThreeDotsVertical
                        onClick={handleDetailsToggle}
                        className="cursor-pointer text-xl hover:scale-110 duration-200 text-gray-600 hover:text-gray-900 "
                    />
                    {isDetailsOpen && (
                        <TodoDetails
                            key={currentTodo.id}
                            todo={currentTodo}
                            softDelete={handleSoftDelete}
                        />
                    )}
                </div>

                {/* Content Area */}
                <textarea
                    placeholder="Take a todo..."
                    value={text}
                    autoFocus
                    spellCheck="false"
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 m-4 mt-2 p-4 rounded-xl bg-white/50 border border-gray-200 outline-none shadow-inner resize-none focus:ring-2 focus:ring-[#6949c1]/40 transition-all duration-300"
                ></textarea>

            </div>
        </div>
    );
}

export default TodoForm;
