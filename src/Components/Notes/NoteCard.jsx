
import { useState } from "react";
import { SiPinboard } from "react-icons/si";
import { MdDeleteForever, MdRestore } from "react-icons/md";
import { UseNote } from "../../Context/NotesContext";
import ConfirmModal from "../Common/Confirm";

function NoteCard({ note, isRecycleBin }) {
    const { openForm, softDelNote, permanentDelNote, restoreNote } = UseNote();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        setShowDeleteConfirm(false);
        if (isRecycleBin) {
            permanentDelNote(note.id);
        } else {
            softDelNote(note.id);
        }
    };

    const handleRestoreClick = (e) => {
        e.stopPropagation();
        setShowRestoreConfirm(true);
    };

    const handleConfirmRestore = () => {
        setShowRestoreConfirm(false);
        restoreNote(note.id);
    };

    return (
        <>
            <div
                onClick={!isRecycleBin ? () => openForm(note) : undefined}
                className={`
                    group
                    bg-white 
                    rounded-sm 
                    shadow-[-1px_4px_4px_rgba(0,0,0,0.2)]
                    p-2
                    relative 
                    overflow-hidden 
                    flex flex-col 
                    transition-all duration-300 ease-in-out
                    cursor-pointer
                    hover:-translate-y-0.5
                    h-[100px]
                    sm:h-[120px] md:h-[150px] lg:h-[170px]
                    sm:min-w-[100px] md:min-w-[110px] lg:min-w-[140px] xl:min-w-[170px]
                    ${!isRecycleBin
                        ? " hover:bg-blue-50"
                        : "opacity-80 cursor-not-allowed"
                    }
                `}
            >
                {/* Header */}
                <div className="flex justify-between items-start">
                    <h2 className="font-semibold text-gray-900 line-clamp-1 sm:text-lg w-[85%]">
                        {note.title ? note.title : "Untitled Note"}
                    </h2>

                    {note.isPinned && (
                        <SiPinboard
                            className="text-lg sm:text-xl text-blue-500 transform scale-x-[-1] opacity-90 group-hover:opacity-100"
                        />
                    )}
                </div>

                {/* Content */}
                <p className="p-1 text-gray-700 text-sm truncate overflow-hidden text-ellipsis whitespace-normal line-clamp-4">
                    {note.content || "No content available..."}
                </p>

                {/* Footer Actions */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    {isRecycleBin && (
                        <MdRestore
                            onClick={handleRestoreClick}
                            className="cursor-pointer text-lg sm:text-xl text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200"
                        />
                    )}
                    <MdDeleteForever
                        onClick={handleDeleteClick}
                        className="cursor-pointer text-lg sm:text-xl text-gray-600 hover:text-red-600 hover:scale-110 transition-transform duration-200 ml-auto"
                    />
                </div>
            </div>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={showDeleteConfirm}
                confirmText={"Delete"}
                classes={"bg-red-500 hover:bg-red-600"}
                title={
                    isRecycleBin
                        ? "Permanently Delete Note?"
                        : "Move Note to Recycle Bin?"
                }
                message={
                    isRecycleBin
                        ? "This action cannot be undone. Are you sure you want to delete this note permanently?"
                        : "Are you sure you want to move this note to the recycle bin?"
                }
                onCancel={() => setShowDeleteConfirm(false)}
                onConfirm={handleConfirmDelete}
            />

            {/* Restore Confirmation */}
            {isRecycleBin && (
                <ConfirmModal
                    confirmText={"Restore"}
                    classes={"bg-blue-500 hover:bg-blue-600"}
                    isOpen={showRestoreConfirm}
                    title={"Restore Note?"}
                    message={"Are you sure you want to restore this note from the recycle bin?"}
                    onCancel={() => setShowRestoreConfirm(false)}
                    onConfirm={handleConfirmRestore}
                />
            )}
        </>
    );
}

export default NoteCard;
