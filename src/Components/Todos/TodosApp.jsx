import { useEffect, useState } from "react"
import { TodoContext } from "../../Context/TodosContext"
import SearchBar from "../Common/SearchBar"
import TodoList from "./TodosList"
import TodoForm from "./TodosForm"
import { FaRegPenToSquare, FaBars } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import SideBar from "../Common/SideBar"
import { LuNotebook } from "react-icons/lu";


function TodosApp() {

    const [todos, setTodos] = useState([]);

    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [activeFolder, setActiveFolder] = useState('All Notes');
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [activeFolderView, setActiveFolderView] = useState(
        <div className="flex items-center gap-2">
            <LuNotebook /> All Todos
        </div>
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchInput]);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('myTodos'));
        if (todos && todos.length > 0) setTodos(todos);
    }, []);

    useEffect(() => {
        localStorage.setItem('myTodos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        setTodos(prevTodos => [{ id: Date.now(), ...todo }, ...prevTodos])
    }

    const UpdateTodo = (id, UpdateTodo) => {
        setTodos(prevTodos => prevTodos.map(note => note.id === id ? { ...note, ...UpdateTodo, lastUpdateAt: new Date().toLocaleString() } : note))
    }

    const softDelTodo = (id) => {
        setTodos(prevTodos => prevTodos.map(note => note.id === id ? { ...note, isDeleted: true } : note))
    }

    const restoreTodo = (id) => {
        setTodos(prevTodos => prevTodos.map(note => note.id === id ? { ...note, isDeleted: false } : note))
    }

    const togglePin = (id) => {
        setTodos(prevTodos => prevTodos.map(note => note.id === id ? { ...note, isPinned: !note.isPinned } : note))
    }

    const permanentDelTodo = (id) => {
        setTodos(prevTodos => prevTodos.filter(note => note.id !== id))
    }

    const recycleBinTodo = (id) => {
        setNotes(prevTodos => prevTodos.map(note => note.id === id ? { ...note, isDeleted: true } : note))
    }

    const openForm = (note) => {
        setSelectedTodo(note);
        setIsFormOpen(true);
    }

    const closeForm = () => {
        setSelectedTodo(null);
        setIsFormOpen(false);
    }

    const toggleSideBar = () => {
        setIsSideBarOpen(prev => !prev);
    }

    const handleSelectFolder = (folderLabel, FolderIcon) => {
        setActiveFolder(folderLabel);
        setActiveFolderView(
            <div className="flex items-center gap-2 justify-center">
                {FolderIcon} {folderLabel}
            </div>
        );
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, UpdateTodo, softDelTodo, permanentDelTodo, recycleBinTodo, togglePin, restoreTodo, openForm, closeForm }}>

            <div className=" relative w-[50%] h-[93vh] bg-gray-100 rounded-md p-2 pb-9.5 flex flex-col items-center gap-2 overflow-hidden">

                <SearchBar placeholder={'Search notes...'} searchInput={searchInput} setSearchInput={setSearchInput} />

                <div className=" flex items-center justify-center text-xs font-semibold h-6 text-white rounded pr-3 pl-3 cursor-pointer bg-[#7d5dd3]">{activeFolderView}</div>

                <TodoList activeFolder={activeFolder} searchInput={debouncedSearch} />

                {isFormOpen && <TodoForm selectedTodo={selectedTodo} closeForm={closeForm} />}

                <div onClick={() => setIsFormOpen(true)}
                    className="group absolute bottom-17 right-4 bg-white rounded-4xl shadow-xl p-4 cursor-pointer text-red-500 hover:scale-[1.1] hover:shadow-3xl transition-all duration-300 animate-fadeIn">
                    <FaRegPenToSquare className="text-xl" />
                    <span
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-1 py-1 text-xs font-semibold text-white bg-[#7d5dd3] rounded-md shadow-[0px_0px_8px_2px_rgba(93,64,177,0.6)] opacity-0 scale-90 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap">
                        New Note
                    </span>
                </div>

                {!isSideBarOpen ?
                    <FaBars onClick={toggleSideBar}
                        className=" absolute top-3.5 left-3 text-xl text-[#6949c1] cursor-pointer animate-fadeIn" />
                    : <RiCloseFill
                        onClick={toggleSideBar}
                        className="z-1000 absolute top-2 left-1.5 text-3xl font-bold text-white cursor-pointer animate-fadeIn" />}

                <SideBar isOpen={isSideBarOpen} onSelectFolder={handleSelectFolder} notes={todos} />

            </div>

        </TodoContext.Provider >
    )
}

export default TodosApp


