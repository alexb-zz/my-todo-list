import React from 'react';
import Task from './Task';
// import classes from './PostsList.module.css';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';


  // useEffect(() => {
  //   setIsFetching(true);
  //   async function fetchTasks(){
  //     const response = await fetch('http://localhost:9000/api/tasks')
  //     const resData = await response.json();
  //     setTasks(resData.tasks);
  //     setIsFetching(false);
  //   }

  //   fetchTasks();
  // }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:9000/api/tasks');
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return response.json();
  };

//   function addPostHandler(postData){
//     fetch('http://localhost:8080/posts', {
//       method:'post',
//       body: JSON.stringify(postData),
//       headers: {'Content-Type': 'application/json'
//       }
//     });
//     setPosts((existingPosts) => [postData, ...existingPosts]);
//   }
const updateTask = async ({ id, completed, creator }) => {
  const response = await fetch(`http://localhost:9000/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function TasksList() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: 'tasks',
    queryFn: fetchTasks,
  });

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['tasks']);
    },
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  const tasksArray = Array.isArray(data.tasks) ? data.tasks : [];

  return (
    <>
      <div className='flex flex-row justify-center items-center min-h-screen  bg-black'>
        
      <div className='flex flex-col justify-start items-center w-[30rem] min-h-[40rem] border-spacing-1 rounded-lg border-2 border-slate-200/50'>

      <div className='m-4 p-2 text-4xl text-slate-100/50'>My Todo List</div>
        <ul className='flex flex-col justify-center items-center m-4  bg-black p-4 rounded-lg text-slate-300 min-h-2.5 border-2 border-slate-200/50 shadow-lg'>
          {tasksArray.map((task) => (
            <Task 
              key={task.id} 
              title={task.title} 
              description={task.description} 
              completed={task.completed}
              creator={task.creator}
              onToggleCompleted={(completed) => mutation.mutate({ id: task.id, completed })} />
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}

export default TasksList;