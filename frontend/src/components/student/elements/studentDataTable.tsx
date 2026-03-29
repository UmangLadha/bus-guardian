import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import type {
  CreateStudentDto,
  ModalStateHandler,
  StudentApiResponse,
} from "../../../types/types";
import TableState from "../../common/tableState/tableState";
import { useFetchData } from "../../../hooks/useFetchData";
import Modal from "../../common/model/modal";
import DeleteModal from "../../common/deleteModal/deleteModal";

function StudentDataTable({
  setOpenModal,
  setSelectedData,
  setIsEditMode,
}: ModalStateHandler<CreateStudentDto>) {
  const { isError, isLoading, data, deleteId, setDeleteId, handleDelete } =
    useFetchData<StudentApiResponse>({
      endpoint: "/student",
      queryKey: ["students"],
    });

  const actionEdit = (studentData: CreateStudentDto) => {
    setSelectedData(studentData);
    setIsEditMode(true);
    setOpenModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <>
      <TableState colSpan={5} isError={isError} isLoading={isLoading}>
        <tbody>
          {data?.students.map((data) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                {data.studentId}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {data.studentName}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {data.parentPhoneNo}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {data.checkpoint}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {data.assignedBus?.busNumber}
              </td>
              <td className="py-3 px-4 flex gap-4 items-center">
                <FaRegEdit
                  title="Update"
                  onClick={() => actionEdit(data)}
                  className="text-amber-500 size-5 cursor-pointer"
                />
                <MdDeleteOutline
                  title="Delete"
                  onClick={() => handleDeleteClick(data._id!)}
                  className="text-red-600 size-5 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableState>
      {deleteId && (
        <Modal>
          <DeleteModal
            setIsDelete={handleCancelDelete}
            handleDelete={handleDelete}
          />
        </Modal>
      )}
    </>
  );
}

export default StudentDataTable;
