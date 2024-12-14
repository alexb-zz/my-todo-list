import Task from './Task';
// import classes from './PostsList.module.css';
import { useEffect, useState } from 'react';

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchTasks(){
      const response = await fetch('http://localhost:9000/api/tasks')
      const resData = await response.json();
      setTasks(resData.tasks);
      setIsFetching(false);
    }

    fetchTasks();
  }, []);

//   function addPostHandler(postData){
//     fetch('http://localhost:8080/posts', {
//       method:'post',
//       body: JSON.stringify(postData),
//       headers: {'Content-Type': 'application/json'
//       }
//     });
//     setPosts((existingPosts) => [postData, ...existingPosts]);
//   }

    

  return (
    <>
    {!isFetching && tasks.length > 0 && (
      <div className='bg-slate-900'>
      <div className='flex flex-col justify-center items-center border-spacing-1rouded-lg'>
        <ul className='flex flex-col justify-center items-center m-4  bg-slate-800 p-4 rounded-lg text-slate-300  text-size-2xl min-h-screen  shadow-lg'>
          {tasks.map((task) => (
            <Task id={task.id} title={task.title} description={task.description} completed={task.completed} />
          ))}
        </ul>
      </div>
      </div>
    )}
    </>
  );
}

export default TasksList;