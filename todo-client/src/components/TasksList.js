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
      //background (color)//.
      <div className='flex flex-row justify-center items-center min-h-screen  bg-black'>
        
      <div className='flex flex-col justify-start items-center w-[30rem] min-h-[40rem] border-spacing-1 rounded-lg border-2 border-slate-200/50'>

      <div className='m-4 p-2 text-4xl text-slate-100/50'>My Todo List</div>
        <ul className='flex flex-col justify-center items-center m-4  bg-black p-4 rounded-lg text-slate-300 min-h-2.5 border-2 border-slate-200/50 shadow-lg'>
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