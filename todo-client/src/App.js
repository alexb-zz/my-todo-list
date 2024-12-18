import React from 'react';
import TasksList from './components/TasksList';
import './App.css';
import './App.css';


function App() {
  return (
    <div className="bg-slate-400 min-h-screen flex flex-col justify-center items-center">
      <header>
        <h1> My todo list</h1>
      </header>
      <main>
        <TasksList />
      </main>
    </div>
  );
}

export default App;
