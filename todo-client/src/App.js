import React,{ useState } from 'react';
import TasksList from './components/TasksList';
import Modal from './components/Modal';
import './App.css';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  return (
    <div id="app" className='flex flex-row justify-center items-center min-h-screen  bg-black'>
      <div id="outer" className='flex flex-col justify-start items-center w-[30rem] min-h-[40rem] border-spacing-1 rounded-lg border-2 border-orange-200/50'>
      <header >
        <h1 className='z-100 text-4xl font-bold mb-4'>My Todo List</h1>
        <button id="open-modal-bttn" onClick={handleOpenModal} className="px-2 py-2 bg-green-500 rounded hover:bg-green-700">
          + Task
        </button>
      </header>
      <div className='m-4 p-2 text-4xl text-slate-100/50'>My Todo List</div>
        <main id="app-main" className="flex flex-col justify-center items-center">
          <TasksList />
          {isModalOpen && (
            <Modal onClose={handleCloseModal} show={isModalOpen} />
          )} 
        </main>
      </div>
    </div>
  );
}

export default App;

