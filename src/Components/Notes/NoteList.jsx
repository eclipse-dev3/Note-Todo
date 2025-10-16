
import { UseNote } from "../../Context/NotesContext";
import NoteCard from "./NoteCard";
import { LuInbox } from "react-icons/lu";

function NoteList({ activeFolder, searchInput }) {
    const { notes } = UseNote();

    const filteredNotes = notes.filter(note => {
        const matchSearch = note.title?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()) ||
            note.content?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());

        if (activeFolder === "All Notes") return !note.isDeleted && matchSearch;
        if (activeFolder === "Pinned Notes") return note.isPinned && !note.isDeleted && matchSearch;
        if (activeFolder === "Locked Notes") return note.isLocked && !note.isDeleted && matchSearch;
        if (activeFolder === "Recycle Bin") return note.isDeleted && matchSearch;
        return !note.isDeleted && matchSearch;
    });

    if (filteredNotes.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center h-[60vh] text-gray-600 animate-fadeIn">
                <LuInbox className="text-6xl mb-3 text-gray-500" />
                <p className="font-semibold text-lg">No notes found in {activeFolder}.</p>
                <p className="text-sm text-gray-400 mt-1">Try creating or restoring some notes.</p>
            </div>
        );
    }

    return (

        <div key={activeFolder}
            className="w-full grid grid-cols-3 max-md:grid-cols-3 max-lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5 p-2  max-[500px]:p-2 max-[500px]:gap-3 overflow-y-auto rounded-md animate-fadeIn scrollbar-hide">

            {filteredNotes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    isRecycleBin={activeFolder === "Recycle Bin"}
                />
            ))}

        </div>

    );
}

export default NoteList;
