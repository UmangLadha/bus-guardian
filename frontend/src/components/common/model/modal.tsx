import type { ModalPropsTypes } from "../../../types/types";

function Modal({ children }: ModalPropsTypes) {
  return (
    <>
      <div className="fixed inset-0 backdrop-brightness-30 bg-gray-900/20 flex items-start justify-center z-50 p-4 ">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg p-6 min-w-72 max-w-xl shadow-xl relative mt-8 mb-8 w-full max-h-[90vh] overflow-y-auto"
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
