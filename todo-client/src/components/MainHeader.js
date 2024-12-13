import { Link } from 'react-router-dom';

function MainHeader({  }) {
  return (
    <header>
      <h1>my Todo List</h1>
      <p>
        <Link>
          New Task
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;