import TasksList from '../components/TasksList';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Tasks() {

  return (
    <>
      <main>
        <QueryClientProvider client={queryClient}>
        <TasksList />
        </QueryClientProvider>
      </main>
    </>
  );
}

export default Tasks;