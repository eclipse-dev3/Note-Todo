
import { LuNotebook } from "react-icons/lu";
import { TiLockClosed, TiPin } from "react-icons/ti";
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from "react";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare, FaInstagramSquare } from "react-icons/fa";
import Profile from "../../assets/profile.png"

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
        <div className={`absolute top-0 left-0 w-[30%] h-[85vh] bg-[#7d5dd3] rounded-tr-md rounded-br-md p-4 text-white overflow-hidden shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

            {/* three glowing dots */}
            <div className="flex gap-4.5 absolute right-5">
                <div className="bg-red-600 w-0.5 h-0.5 rounded-full shadow-[0px_0px_6px_4px_rgba(255,0,0,1)]"></div>
                <div className="bg-green-400 w-0.5 h-0.5 rounded-full shadow-[0px_0px_6px_4px_rgba(0,255,0,1)]"></div>
                <div className="bg-blue-800 w-0.5 h-0.5 rounded-full shadow-[0px_0px_6px_4px_rgba(0,0,255,1)]"></div>

            </div>

            <ul className="mt-13">
                {keys.map(({ id, label, icon }) => {
                    const isActive = label === activeFolder;
                    return (
                        <li
                            key={id}
                            onClick={displayFolder(label, icon)}
                            className={`mb-2 p-3 flex items-center gap-3 rounded cursor-pointer transition-colors duration-300
                                 ${isActive ? "bg-[#5e40b1] text-white" : "text-white hover:bg-[#5e40b1] hover:text-white"}`}
                        >
                            {icon} {label}
                        </li>
                    );
                })}
            </ul>


            {/* Contact Linkes */}

            <ul className="absolute bottom-1 left-0 w-full border-t border-white/30">

                <li className="p-3  flex items-center justify-evenly gap-2">
                    <span className="text-xs font-semibold">Developer</span>
                    <a href="https://gaurav-kumar-03.vercel.app" target="_blank">
                        <img src={Profile} alt="Profile" width={45} className="hover:scale-110 duration-200 p-0.5 bg-blue-900 rounded-full" />
                    </a>
                </li>

                <li className="flex gap-4 pb-3 pt-2 justify-center">

                    <a href="https://www.linkedin.com/in/gaurav-kumar-5b678437a/" target="_blank">
                        <FaLinkedin className="text-md hover:scale-115 duration-200 hover:text-[#0077b5] hover:bg-white rounded cursor-pointer" />
                    </a>
                    <a href="https://github.com/eclipse-dev3" target="_blank">
                        <FaGithubSquare className="text-md hover:scale-115 duration-200 hover:text-[#222] hover:bg-white rounded cursor-pointer" />
                    </a>
                    <a href="https://www.instagram.com/itseclipsedev/" target="_blank">
                        <FaInstagramSquare className="text-md hover:scale-115 duration-200 hover:text-[#e1306c] hover:bg-white rounded cursor-pointer" />
                    </a>
                    <a href="https://x.com/eclipse_devX" target="_blank">
                        <FaSquareXTwitter className="text-md hover:scale-115 duration-200 hover:text-[#222] hover:bg-white rounded cursor-pointer" />
                    </a>

                </li>

            </ul>

        </div>
    );
}

export default SideBar;
