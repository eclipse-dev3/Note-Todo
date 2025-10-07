// import { LuNotebook } from "react-icons/lu";
// import { TiLockClosed, TiPin } from "react-icons/ti";
// import { HiOutlineTrash } from "react-icons/hi2";



// function SideBar({ isOpen, onSelectFolder }) {

//     const keys = [
//         { id: 1, label: 'All Notes', icon: <LuNotebook /> },
//         { id: 2, label: 'Pinned Notes', icon: <TiPin className="text-xl" /> },
//         { id: 3, label: 'Locked Notes', icon: <TiLockClosed className="text-xl" /> },
//         { id: 4, label: 'Recycle Bin', icon: <HiOutlineTrash className="text-xl" /> },
//     ]

//     const displayFolder = (label, icon) => (e) => {
//         e.stopPropagation();
//         onSelectFolder(label, icon);
//     }

//     return (
//         <div className={`absolute top-12 left-0 w-[30%] h-[75vh] bg-gray-900 rounded-tr-md rounded-br-md p-2 text-white overflow-hidden shadow-lg transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

//             <div>
//                 <h2 className="text-lg font-bold mb-5 mt-2">Sidebar</h2>

//                 <ul>
//                     {keys.map(({ id, label, icon }) => (
//                         <li onClick={displayFolder(label, icon)}
//                             key={id} className="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer flex items-center gap-3">
//                             {icon} {label}
//                         </li>
//                     ))}
//                 </ul>

//             </div>

//         </div>
//     )
// }

// export default SideBar


import { LuNotebook } from "react-icons/lu";
import { TiLockClosed, TiPin } from "react-icons/ti";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";

function SideBar({ isOpen, onSelectFolder }) {
    const [activeFolder, setActiveFolder] = useState("All Notes");

    const keys = [
        { id: 1, label: 'All Notes', icon: <LuNotebook /> },
        { id: 2, label: 'Pinned Notes', icon: <TiPin className="text-xl" /> },
        { id: 3, label: 'Locked Notes', icon: <TiLockClosed className="text-xl" /> },
        { id: 4, label: 'Recycle Bin', icon: <HiOutlineTrash className="text-xl" /> },
    ];

    const displayFolder = (label, icon) => (e) => {
        e.stopPropagation();
        setActiveFolder(label);
        onSelectFolder(label, icon);
    };

    return (
        <div className={`absolute top-1 left-0 w-[30%] h-[85vh] bg-gray-800 rounded-tr-md rounded-br-md p-4 text-white overflow-hidden shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

            <ul className="mt-13">
                {keys.map(({ id, label, icon }) => {
                    const isActive = label === activeFolder;
                    return (
                        <li
                            key={id}
                            onClick={displayFolder(label, icon)}
                            className={`mb-3 p-3 flex items-center gap-3 rounded cursor-pointer transition-colors duration-300
                                ${isActive ? "bg-blue-900 text-white" : "text-gray-200 hover:bg-blue-900 hover:text-white"}`}
                        >
                            {icon} {label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SideBar;
