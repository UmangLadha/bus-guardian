import type React from "react";
import { HiOutlineX } from "react-icons/hi";

interface ModalProps {
  title?: string;
  subTitle?: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function Modal({ setOpenModal, title, subTitle, children }: ModalProps) {
  return (
    <>
      <div
        onClick={() => setOpenModal(false)}
        className="fixed inset-0 top-0 bottom-0 left-0 right-0 backdrop-brightness-30 bg-gray-900/20 flex items-center justify-center z-50 p-4 "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white bottom-10 rounded-lg p-6 w-full max-w-xl shadow-xl relative"
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className=" text-gray-500">{subTitle}</p>
            </div>
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
