import React, { createContext, useState, useContext } from "react";

// Create the context
const ModalContext = createContext();

// Custom hook to use the ModalContext
export const useModal = () => useContext(ModalContext);

// Provider component
export const ModalProvider = ({ children }) => {

  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  console.log("ModalProvider: showModal =", showModal);

  return (
    <ModalContext.Provider value={{  showModal, openModalHandler, closeModalHandler }}>
      {children}
    </ModalContext.Provider>
  );
};