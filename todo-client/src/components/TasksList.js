import React from 'react';
import Task from './Task';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:9000/api/tasks');
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    return response.json();
  };

const updateTask = async ({ id, completed }) => {
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

function TasksList(props) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
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
    </>
  );
}

export default TasksList;