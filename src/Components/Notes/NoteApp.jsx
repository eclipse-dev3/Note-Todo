import { useEffect, useState } from "react"
import { NoteContext } from "../../Context/NotesContext"
import SearchBar from "../Common/SearchBar"
import NoteList from "./NoteList"
import NoteForm from "./NoteForm"
import { FaRegPenToSquare, FaBars } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import SideBar from "./SideBar"
import { LuNotebook } from "react-icons/lu";


function NoteApp() {

    const [notes, setNotes] = useState([]);

    const [selectedNote, setSelectedNote] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [activeFolder, setActiveFolder] = useState('All Notes');
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [activeFolderView, setActiveFolderView] = useState(
        <div className="flex items-center gap-2">
            <LuNotebook /> All Notes
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
        const notes = JSON.parse(localStorage.getItem('allNotes'));
        if (notes && notes.length > 0) setNotes(notes);
    }, []);

    useEffect(() => {
        localStorage.setItem('allNotes', JSON.stringify(notes));
    }, [notes]);

    const addNote = (note) => {
        setNotes(prevNotes => [{ id: Date.now(), ...note }, ...prevNotes])
    }

    const UpdateNote = (id, updatedNote) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, ...updatedNote, lastUpdateAt: new Date().toLocaleString() } : note))
    }

    const softDelNote = (id) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isDeleted: true } : note))
    }

    const restoreNote = (id) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isDeleted: false } : note))
    }

    const togglePin = (id) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isPinned: !note.isPinned } : note))
    }

    const permanentDelNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
    }

    const recycleBinNotes = (id) => {
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, isDeleted: true } : note))
    }

    const openForm = (note) => {
        setSelectedNote(note);
        setIsFormOpen(true);
    }

    const closeForm = () => {
        setSelectedNote(null);
        setIsFormOpen(false);
    }

    const toggleSideBar = () => {
        setIsSideBarOpen(prev => !prev);
    }

    const handleSelectFolder = (folderLabel, FolderIcon) => {
        setActiveFolder(folderLabel);
        setActiveFolderView(
            <div className="flex items-center gap-2 font-bold text-lg">
                {FolderIcon} {folderLabel}
            </div>
        );
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, UpdateNote, softDelNote, permanentDelNote, recycleBinNotes, togglePin, restoreNote, openForm, closeForm }}>

            <div className=" relative w-[50%] h-[93vh] bg-gray-200 rounded-lg p-2 pb-9.5 flex flex-col items-center gap-2 overflow-hidden">

                <SearchBar placeholder={'Search notes...'} searchInput={searchInput} setSearchInput={setSearchInput} />

                <div className="font-bold text-lg duration-1000 animate-fadeIn">{activeFolderView}</div>

                <NoteList activeFolder={activeFolder} searchInput={debouncedSearch} />

                {isFormOpen && <NoteForm selectedNote={selectedNote} closeForm={closeForm} />}

                <div onClick={() => setIsFormOpen(true)}
                    className="absolute bottom-17 right-4 bg-white rounded-4xl shadow-xl p-4 cursor-pointer text-red-500 hover:scale-[1.1] hover:shadow-3xl transition-all duration-300 animate-fadeIn">
                    <FaRegPenToSquare className="text-xl" />
                </div>

                {!isSideBarOpen ?
                    <FaBars onClick={toggleSideBar}
                        className=" absolute top-3.5 left-3 text-xl text-gray-900 cursor-pointer animate-fadeIn" />
                    : <RiCloseFill
                        onClick={toggleSideBar}
                        className="z-1000 absolute top-2 left-1.5 text-3xl font-bold text-white cursor-pointer animate-fadeIn" />}

                <SideBar isOpen={isSideBarOpen} onSelectFolder={handleSelectFolder} />

            </div>

        </NoteContext.Provider>
    )
}

export default NoteApp


// -ecllpsE#lnsta03