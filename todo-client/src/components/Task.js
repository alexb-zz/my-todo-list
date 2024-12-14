///import classes from './Task.module.css';
import { useState, useEffect } from 'react';

function Task(props) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setIsDone(props.completed);
  }, [props.completed]);
  
  const handleCheckboxChange = () => {
    setIsDone(!isDone);
  }

  return (
    <li className='flex justify-end items-center m-2 p-2 min-w-96 bg-slate-800 rounded-lg text-slate-400 shadow-inner-custom'>
      <div id="key" className='hidden'>{props.id}</div>
      <div className='p-2 m-2 text-size-6xl'>{props.title}</div>
      <input 
        className='m-2 p-2'
          type="checkbox" 
          checked={isDone} 
          onChange={handleCheckboxChange}
        />

      <div className='hidden'>{props.description}</div>
    </li>
  );
}

export default Task;