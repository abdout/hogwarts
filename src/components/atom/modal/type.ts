export interface ModalState {
    open: boolean;
    id: string | null;
    data?: unknown;
  }
  
  export interface ModalContextProps {
    modal: ModalState;
    openModal: (id: string | null, data?: unknown) => void;
    closeModal: () => void;
    handleCloseModal: () => void;
  }