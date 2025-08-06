import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import type {
  ModalStateHandler,
  CreateBusDto,
  BusApiResponse,
} from "../../../types/types";
import DeleteModal from "../../common/deleteModal/deleteModal";
import Modal from "../../common/model/modal";
import { useFetchData } from "../../../hooks/useFetchData";
import { setbus } from "../../../redux/features/bus/busSlice";
import TableState from "../../common/tableState/tableState";

function BusDataTable({
  setOpenModal,
  setSelectedData,
  setIsEditMode,
}: ModalStateHandler<CreateBusDto>) {
  const { data, isLoading, isError, deleteId, setDeleteId, handleDelete } =
    useFetchData<BusApiResponse>({
      endpoint: "/bus",
      queryKey: ["buses"],
      sliceAction: setbus,
    });

  const actionEdit = (busData: CreateBusDto) => {
    setSelectedData(busData);
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
      <TableState
        isError={isError}
        isLoading={isLoading}
        colSpan={5}
        loadingMessage="Loading buses..."
        errorMessage="Failed to load bus data."
      >
        <tbody>
          {data?.buses.map((busData: CreateBusDto) => (
            <tr
              key={busData._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                {busData.busNumber}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {busData.assignedDriver?.driverName || "—"}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {busData.assignedRoute?.busRoute || "—"}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {busData.busCapacity}
              </td>
              <td className="py-3 px-4 flex gap-4 items-center">
                <FaRegEdit
                  title="Update"
                  onClick={() => actionEdit(busData)}
                  className="text-amber-500 size-5 cursor-pointer"
                />
                <MdDeleteOutline
                  title="Delete"
                  onClick={() => handleDeleteClick(busData._id!)}
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

export default BusDataTable;
