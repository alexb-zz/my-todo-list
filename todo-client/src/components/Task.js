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
    <li>
      <p>{props._id}</p>
      <p>{props.title}</p>
      <p>{props.description}</p>

      Done?<input 
        type="checkbox" 
        checked={isDone} 
        onChange={handleCheckboxChange}
      />
      
    </li>
  );
}

export default Task;