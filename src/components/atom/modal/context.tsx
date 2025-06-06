'use client';
import { ModalContextProps, ModalState } from "./type";
import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({open: false, id: null});

  const openModal = (id: string | null, data?: unknown) => {
    setModal({open: true, id: id, data: data});
  };

  const closeModal = () => {
    setModal({open: false, id: null, data: undefined});
  };

  const handleCloseModal = () => {
    setModal({open: false, id: null, data: undefined});
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, handleCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
};