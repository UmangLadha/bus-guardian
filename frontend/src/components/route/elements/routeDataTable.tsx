import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import type {
  CreateRouteDto,
  ModalStateHandler,
  RouteApiResponse,
} from "../../../types/types";
import { setRoutes } from "../../../redux/features/route/routeSlice";
import { useFetchData } from "../../../hooks/useFetchData";
import Modal from "../../common/model/modal";
import DeleteModal from "../../common/deleteModal/deleteModal";
import TableState from "../../common/tableState/tableState";

function RouteDataTable({
  setOpenModal,
  setSelectedData,
  setIsEditMode,
}: ModalStateHandler<CreateRouteDto>) {
  const { isError, isLoading, setDeleteId, deleteId, handleDelete, data } =
    useFetchData<RouteApiResponse>({
      endpoint: "/route",
      queryKey: ["routes"],
      sliceAction: setRoutes,
    });

  const actionEdit = (routeData: CreateRouteDto) => {
    setSelectedData(routeData);
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
          {data?.Routes.map((data) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-4 text-sm font-medium text-gray-900">
                {data.routeName}
              </td>
              <td className="py-3 px-4 text-sm text-gray-900">
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                  {data.locationsList.map((detail, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full whitespace-nowrap"
                    >
                      {detail.locationName}
                    </span>
                  ))}
                </div>
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

export default RouteDataTable;
