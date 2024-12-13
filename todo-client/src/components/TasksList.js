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
      <ul>
      {tasks.map((task) => (
        <Task key={task.id} title={task.title} description={task.description} completed={task.completed} />
      ))}
    </ul>
    )}
    </>
  );
}

export default TasksList;