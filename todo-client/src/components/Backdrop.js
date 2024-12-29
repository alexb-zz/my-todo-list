import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Backdrop = props => {
  useEffect(() => {
    console.log('Backdrop mounted');
    return () => {
      console.log('Backdrop unmounted');
    };
  }, []);

  const content = <div className='h-screen w-screen bg-slate-500' onClick={props.onClick} />;

  return ReactDOM.createPortal(
    content, document.getElementById('backdrop-hook')
  );
};

export default Backdrop;

