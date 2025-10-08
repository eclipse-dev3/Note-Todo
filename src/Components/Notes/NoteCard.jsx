
import { useState } from "react";
import { SiPinboard } from "react-icons/si";
import { MdDeleteForever, MdRestore, MdEdit } from "react-icons/md";
import { UseNote } from "../../Context/NotesContext";
import ConfirmModal from "../Common/Confirm";
import { FormatDateShort } from "../Common/FormateDate";

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
            <div className={`
                    group
                    bg-white 
                    rounded-md 
                    shadow-[-1px_2px_4px_rgba(0,0,0,0.3)]
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

                {/* Tittle...... */}

                <div className="flex justify-around items-center gap-2">

                    {note?.isPinned ? <div className="bg-blue-500 w-0.5 h-0.5 rounded-full shadow-[0px_0px_6px_2.5px_rgba(0,0,255,1)]"></div>
                        : <div className="bg-orange-500 w-0.5 h-0.5 rounded-full shadow-[0px_0px_6px_3px_rgba(255,0,0,1)]"></div>
                    }


                    <h2 className="font-semibold text-gray-800 line-clamp-1 text-md w-[75%]">
                        {note.title ? note.title : "Untitled Note"}
                    </h2>

                    {note.isPinned && (
                        <SiPinboard
                            className="text-lg sm:text-xl text-[#6949c1] transform scale-x-[-1] opacity-90 group-hover:opacity-100"
                        />
                    )}

                </div>

                {/* Content....... */}
                <p className="p-2 pb-0 text-gray-700 text-sm truncate overflow-hidden text-ellipsis whitespace-normal line-clamp-4">
                    {note.content || "No content available..."}
                </p>

                {/* Footer Actions */}

                <div className="flex items-center justify-between absolute bottom-3 left-3 right-3">

                    {isRecycleBin && (
                        <MdRestore
                            onClick={handleRestoreClick}
                            className="cursor-pointer text-lg sm:text-xl text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200"
                        />
                    )}
                    {!isRecycleBin && (
                        <span className="text-xs font-semibold text-gray-700">{FormatDateShort(note?.createdAt)}</span>
                    )}

                    <div className="flex items-center gap-4  absolute right-0 bottom-0">
                        {!isRecycleBin &&
                            <MdEdit
                                onClick={!isRecycleBin ? () => openForm(note) : undefined}
                                className="cursor-pointer text-md text-gray-600 hover:text-green-600 hover:scale-110 transition-transform duration-200 ml-auto"
                            />}
                        <MdDeleteForever
                            onClick={handleDeleteClick}
                            className="cursor-pointer text-lg text-gray-600 hover:text-red-600 hover:scale-110 transition-transform duration-200 ml-auto"
                        />
                    </div>

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
