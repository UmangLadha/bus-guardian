import type React from "react";
import Button from "../button/Button";
import { AiTwotoneDelete } from "react-icons/ai";

interface DeleteModalProps {
  handleDelete: () => void;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteModal({ handleDelete, setIsDelete }: DeleteModalProps) {
  return (
    <>
      <AiTwotoneDelete className="size-10 mx-auto" />
      <div className="py-4 text-center">Are you sure you want to delete this row?</div>
      <div className="flex justify-evenly items-center">
        <Button
          btnType="button"
          btnText="No, cancel"
          onClick={() => setIsDelete(false)}
          className="w-32 font-semibold border border-gray-300 text-gray-400 text-gray py-2 px-5 rounded-lg hover:text-black hover:bg-gray-200"
        />
        <Button
          btnType="button"
          btnText="Yes, delete"
          onClick={() => handleDelete}
          className="w-32 flex items-center justify-evenly font-semibold bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600"
        />
      </div>
    </>
  );
}

export default DeleteModal;
