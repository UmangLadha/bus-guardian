import type { ModalPropsTypes } from "../../../types/types";

function Modal({ children }: ModalPropsTypes) {
  return (
    <>
      <div className="fixed inset-0 top-0 bottom-0 left-0 right-0 backdrop-brightness-30 bg-gray-900/20 flex items-center justify-center z-50 p-4 ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white bottom-10 rounded-lg p-6 min-w-72 max-w-xl shadow-xl relative"
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
