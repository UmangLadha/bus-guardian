import type React from "react";
import { HiOutlineX } from "react-icons/hi";

interface ModalProps {
  title?: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function Modal({ setOpenModal, title, children }: ModalProps) {
  return (
    <>
      <div
        onClick={() => setOpenModal(false)}
        className="fixed inset-0 backdrop-brightness-30 bg-gray-900/20 flex items-center justify-center z-50 p-4 "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white bottom-40 rounded-lg p-6 w-full max-w-xl shadow-xl relative"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <HiOutlineX
              className="size-6 cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
