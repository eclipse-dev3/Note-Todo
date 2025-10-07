import NoteApp from './Components/Notes/NoteApp'
import TodosApp from './Components/Todos/TodosApp'
import './App.css'

function App() {

  return (
    <>
      <header className='p-3 bg-gray-400 mb-1.5'>Header</header>

      <div className=' flex gap-2'>
        <NoteApp />
        <TodosApp />
      </div>

      <footer className='p-1.5 bg-gray-900 fixed bottom-0 left-0 w-full z-100 text-white'>Footer</footer>
    </>
  )
}

export default App

