import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  const content = <React.Fragment>
    { props.show && 
      <div className='fixed inset-0 flex flex-col justify-center items-center h-screen w-screen bg-slate-500' onClick={props.onClose} >
        <div className='flex justify-center items-center'>
          <div className='flex justify-center items-center h-40 w-80 shadow-lg rounded-lg bg-slate-400  text-white text-2xl'>
            <h1>Modal Content</h1>
          </div>
        </div>
      </div> 
    }            
  </React.Fragment>

  return ReactDOM.createPortal(
    content, document.getElementById('backdrop-hook')
  );

}
export default Modal;