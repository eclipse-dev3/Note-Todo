import { createContext, useContext } from "react";

export const NoteContext = createContext({
    notes: [
        {
            id: 1,
            title: 'First Note.',
            content: 'This is the content for first note.',
            createdAt: new Date().toLocaleString(),
            lastUpdateAt: new Date().toLocaleString(),
            isPinned: false,
            isDeleted: false,
        },
    ],
    addNote: (note) => { },
    UpdateNote: (id, updatedNote) => { },
    softDelNote: (id) => { },
    permanentDelNote: (id) => { },
    recycleBinNotes: (id) => { },
    openForm: (note) => { },
    closeForm: () => { },
    restoreNote: (id) => { },
    togglePin: (id) => { },
});



export const UseNote = () => {
    return useContext(NoteContext);
}





// add download note functionality
// add lock and unlock note functionality
// add tags and colors to notes
// add filter by tags and colors
