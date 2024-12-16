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
    <li className='flex justify-between items-center m-2 p-2 min-w-96 bg-black rounded-lg text-slate-400 border-2 border-slate-200/50 shadow-lg'>
      <div id="key" className='hidden'>{props.id}</div>
      <div className='flex fle-col justify-center items-center min-w-80'> 
      <div className='p-2 m-2 text-size-6xl text-2xl text-slate-100/50 '>{props.title}</div>
      </div>
      <input 
        className='form-checkbox h-7 w-7 m-2 p-2'
          type="checkbox" 
          checked={isDone} 
          onChange={handleCheckboxChange}
        />

      <div className='hidden'>{props.description}</div>
    </li>
  );
}

export default Task;