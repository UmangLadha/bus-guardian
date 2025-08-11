import Button from "../button/Button";

interface DeleteModalProps {
  handleDelete: () => void;
  setIsDelete: () => void;
}

function DeleteModal({ handleDelete, setIsDelete }: DeleteModalProps) {
  return (
    <>
      <div className="text-center">
        <p className="text-lg font-semibold mb-2">
          Are you sure you want to delete this row?
        </p>
      </div>
      <div className="flex justify-evenly items-center mt-4">
        <Button
          btnType="button"
          btnText="No, cancel"
          onClick={setIsDelete}
          className="w-32 font-semibold border border-gray-300 text-gray-400 py-2 px-5 rounded-lg hover:text-black hover:bg-gray-200"
        />
        <Button
          btnType="button"
          btnText="Yes, delete"
          onClick={handleDelete}
          className="w-32 flex items-center justify-evenly font-semibold bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600"
        />
      </div>
    </>
  );
}

export default DeleteModal;
