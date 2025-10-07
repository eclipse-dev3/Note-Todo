
import { IoChevronBack } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { RiCloseFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { UseNote } from "../../Context/NotesContext";
import NoteDetails from "./NoteDetails";

function NoteForm({ selectedNote, closeForm }) {
    const { notes, UpdateNote, addNote, softDelNote } = UseNote();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title || "");
            setContent(selectedNote.content || "");
        } else {
            setTitle("");
            setContent("");
        }
    }, [selectedNote]);

    const currentNote = selectedNote
        ? notes.find((n) => n.id === selectedNote.id) || selectedNote
        : {
            id: "temp",
            title,
            content,
            isPinned: false,
            isDeleted: false,
            createdAt: new Date().toLocaleString(),
            lastUpdateAt: new Date().toLocaleString(),
        };

    const handleSave = () => {
        if (!title.trim() && !content.trim()) return;

        if (selectedNote) {
            UpdateNote(selectedNote.id, { title, content });
        } else {
            addNote({
                id: Date.now(),
                title,
                content,
                createdAt: new Date().toLocaleString(),
                lastUpdateAt: new Date().toLocaleString(),
                isPinned: false,
                isDeleted: false,
            });
        }

        closeForm();
        setTitle("");
        setContent("");
    };

    const handleDetailsToggle = (e) => {
        e.stopPropagation();
        setIsDetailsOpen(!isDetailsOpen);
    };

    const handleSoftDelete = (id) => {
        softDelNote(id);
        closeForm();
    };

    return (
        <div className="bg-black/40 w-full h-full absolute top-0 left-0 z-50 flex items-center justify-center animate-fadeIn">

            <RiCloseFill
                onClick={closeForm}
                className="absolute top-3 right-3 cursor-pointer text-3xl text-gray-900 hover:text-red-500 transition-colors"
            />

            <div className="relative bg-white w-[85%] max-w-2xl h-[80%] rounded-xl shadow-2xl overflow-hidden flex flex-col">

                <div className="flex items-center justify-between p-2 border-b border-gray-200">
                    <IoChevronBack
                        onClick={closeForm}
                        className="cursor-pointer text-2xl text-gray-900 hover:text-gray-500 transition-colors"
                    />
                    <GiCheckMark
                        onClick={handleSave}
                        className="cursor-pointer text-2xl text-green-600 hover:text-green-800 transition-colors"
                    />
                </div>

                <div className="flex items-center justify-between px-4 ">
                    <input
                        type="text"
                        placeholder="Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-1.5 border-b-2 border-gray-300 outline-none focus:border-blue-500 text-lg font-semibold placeholder-gray-400 rounded-sm transition-all"
                        autoFocus
                        spellCheck="false"
                    />
                    <div className="relative ml-2">
                        <BsThreeDotsVertical
                            onClick={handleDetailsToggle}
                            className="cursor-pointer text-xl text-gray-600 hover:text-gray-900 transition-colors"
                        />
                        {isDetailsOpen && (
                            <NoteDetails
                                key={currentNote.id}
                                note={currentNote}
                                softDelete={handleSoftDelete}
                            />
                        )}
                    </div>
                </div>

                <textarea
                    placeholder="Take a note..."
                    value={content}
                    spellCheck="false"
                    onChange={(e) => setContent(e.target.value)}
                    className="overflow-y-auto custom-scrollbar flex-1 mt-2 mb-3 ml-4 mr-4 p-3 border border-gray-200 rounded-md resize-none outline-none shadow-inner focus:ring-1 focus:ring-blue-200"
                ></textarea>
            </div>
        </div>
    );
}

export default NoteForm;
