import { TiLockClosed, TiLockOpen } from "react-icons/ti";
import { SiPinboard } from "react-icons/si";
import { RiUnpinLine } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import ConfirmModal from "../Common/Confirm";
import { useState } from "react";
import { UseNote } from "../../Context/NotesContext";
import { jsPDF } from "jspdf";
import { FormatDate } from "../Common/FormateDate";

function NoteDetails({ note, softDelete }) {

  const { togglePin } = UseNote();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    softDelete(note.id);
  };

  const handlePinToggle = (e) => {
    e.stopPropagation();
    togglePin(note.id);
  };

  const handleDownloadPdf = (note) => {
    const doc = new jsPDF();
    const content = `Title: ${note.title}\n\n${note.content}\n\nCreated At: ${note.createdAt}\nLast Updated: ${note.lastUpdateAt}`;
    doc.text(content, 10, 10);
    doc.save(`${note.title || "Untitled Note"}.pdf`);
  };

  return (
    <>
      <div className="animate-fadeSideIn shadow-[-2px_4px_10px_rgba(0,0,0,0.4)] flex flex-col bg-white absolute top-5.5 right-0 w-40 p-1.5 rounded z-20">

        {/* Pin / Unpin */}
        <p onClick={handlePinToggle}
          className="text-sm text-gray-900 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-gray-300 rounded h-10 px-1.5 transition-all duration-300">
          {note?.isPinned ? (
            <>
              <RiUnpinLine className="text-red-600 text-lg" /> Unpin
            </>
          ) : (
            <>
              <SiPinboard className="text-lg transform scale-x-[-1]" /> Pin
            </>
          )}
        </p>

        {/* Download Buttons */}
        <p className="text-sm text-gray-900 font-bold flex items-center gap-1.5 cursor-pointer hover:bg-gray-300 rounded h-10 px-1.5 transition-all duration-300"
          onClick={() => handleDownloadPdf(note)}>
          <HiOutlineDownload className="text-black text-lg" /> Download
        </p>

        {/* Created / Updated */}
        <p className="text-sm text-gray-700 font-bold flex flex-col hover:bg-gray-300 rounded h-10 px-1.5 transition-all duration-300">
          Created at: <span className="font-normal text-[11px]">{FormatDate(note?.createdAt)}</span>
        </p>

        <p className="text-sm text-gray-700 font-bold flex flex-col hover:bg-gray-300 rounded h-10 px-1.5 transition-all duration-300">
          Last updated at: <span className="font-normal text-[11px]">{FormatDate(note?.lastUpdateAt)}</span>
        </p>

        {/* Footer Actions */}
        <div className="flex border-t-1 mt-5 items-center justify-around pt-1">
          <TiLockClosed className="cursor-pointer text-4xl hover:bg-gray-300 rounded transition-all duration-300 py-2 px-1" />
          <MdDeleteForever onClick={handleDeleteClick} className="cursor-pointer text-4xl font-bold hover:bg-gray-300 hover:text-red-600 rounded transition-all duration-300 py-2 px-1" />
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        confirmText={"Delete"}
        classes={'bg-red-500 hover:bg-red-600'}
        title={"Move Note to Recycle Bin?"}
        message={"Are you sure you want to move this note to the recycle bin?"}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />

    </>
  );
}

export default NoteDetails;
