import { useState } from "react";
import NoteApp from "./Components/Notes/NoteApp";
import TodosApp from "./Components/Todos/TodosApp";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-gray-200 mb-1 flex items-center gap-1 relative">
          {["notes", "todos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative w-[50%] p-1.5 cursor-pointer transition-all duration-200 font-medium rounded-xs
                ${activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:text-blue-500 hover:bg-white"
                }`}
            >
              {tab === "notes" ? "Notes" : "Todos"}

              {/* Animated underline */}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full transition-all duration-300"></span>
              )}
            </button>
          ))}
        </header>

        {/* Content */}
        <main className="flex-1">
          {activeTab === "notes" ? <NoteApp /> : <TodosApp />}
        </main>

        {/* Optional Footer */}
        {/* <footer className='p-1.5 bg-[#593ba9] text-center fixed bottom-0 left-0 w-full z-100 text-white'>Footer</footer> */}
      </div>
    </>
  );
}

export default App;
