import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import Backdrop from './Backdrop';
import { useModal } from '../contexts/ModalContext';

const Modal = (props) => {
  const { showModal } = useModal();
  console.log("Modal: showModal =", showModal);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const taskTitle = event.target.taskTitle.value;
    props.onAddTask(taskTitle);
  };
  const content = <React.Fragment>
    { showModal && 
      <Backdrop>
        <Card>
            <form onSubmit={handleFormSubmit}>
              <div className='flex flex-row justify-end items-center'>
                <input type='text' name="taskTitle" className='bg-slate-950 cursor-pointer focus:border-collapse w-64 h-10 p-2 m-2 rounded-lg' placeholder='Enter task' />
                <input type='hidden' name='creator' value={props.creator} />  
                <button type='submit' className='flex flex-row justify-center items-center w-20 h-10 p-2 m-2 border-2 border-white rounded-lg'>Add</button>
              </div>
            </form>
        </Card>
      </Backdrop>
    }            
  </React.Fragment>

  return ReactDOM.createPortal(
    content, document.getElementById('backdrop-hook')
  );

}
export default Modal;