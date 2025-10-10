import NoteApp from './Components/Notes/NoteApp'
import TodosApp from './Components/Todos/TodosApp'
import './App.css'

function App() {

  return (
    <>
      <div>

        <header className='p-1.5 bg-gray-400 mb-1 text-center'>Header</header>

        
          <NoteApp />
          {/* <TodosApp /> */}

        {/* <footer className='p-1.5 bg-[#593ba9] text-center fixed bottom-0 left-0 w-full z-100 text-white'>Footer</footer> */}

      </div>
    </>
  )
}

export default App

