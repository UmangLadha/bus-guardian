import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "../model/modal";
import DeleteModal from "../deleteModal/deleteModal";

function TableAction({ isDelete, actionEdit, setIsDelete, actionDelete }) {
  return (
    <td className="py-3 px-4 flex gap-4 items-center">
      <FaRegEdit
        title="Update"
        onClick={() => actionEdit(data)}
        className="text-amber-500 size-5 cursor-pointer"
      />
      <MdDeleteOutline
        title="Delete"
        onClick={() => setIsDelete(true)}
        className="text-red-600 size-5 cursor-pointer"
      />
      {isDelete && (
        <Modal>
          <DeleteModal
            setIsDelete={setIsDelete}
            handleDelete={() => actionDelete(data._id)}
          />
        </Modal>
      )}
    </td>
  );
}

export default TableAction;
