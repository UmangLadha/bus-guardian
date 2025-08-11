import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import type {
  CreateDriverDto,
  DriverApiResponse,
  ModalStateHandler,
} from "../../../types/types";
import { setDrivers } from "../../../redux/features/driver/driverSlice";
import Modal from "../../common/model/modal";
import DeleteModal from "../../common/deleteModal/deleteModal";
import { useFetchData } from "../../../hooks/useFetchData";
import TableState from "../../common/tableState/tableState";

function DriverDataTable({
  setOpenModal,
  setSelectedData,
  setIsEditMode,
}: ModalStateHandler<CreateDriverDto>) {
  const { data, isLoading, isError, deleteId, setDeleteId, handleDelete } =
    useFetchData<DriverApiResponse>({
      queryKey: ["drivers"],
      endpoint: "/driver",
      sliceAction: setDrivers,
    });

  const actionEdit = (driverData: CreateDriverDto) => {
    setSelectedData(driverData);
    setIsEditMode(true);
    setOpenModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleCancelDelete = (): void => {
    setDeleteId(null);
  };

  return (
    <>
      <TableState isError={isError} isLoading={isLoading} colSpan={5}>
        <tbody>
          {data?.drivers.map((data: CreateDriverDto) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm text-gray-700">
                {data.driverName}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {data.driverPhoneNo}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {data.assignedBus?.busNumber || "—"}
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

export default DriverDataTable;
