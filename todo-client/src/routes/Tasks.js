import TasksList from '../components/TasksList';
import { Outlet } from 'react-router-dom';

function Tasks() {

  return (
    <>
      <Outlet />
      <main>
        <TasksList />
      </main>
    </>
  );
}

export default Tasks;