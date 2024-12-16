import React from 'react';
import ReactDOM from 'react-dom/client';
import Tasks from './routes/Tasks';
import NewTask from './routes/NewTask';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import RootLayout from './routes/RootLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
     path: '/',
     element: <RootLayout />,
     children: [
       {
          path: '/',
          element: <Tasks />,
          children: [{path: 'create-task', 
            element: <NewTask />
          }],
       },
     ],
  }
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
