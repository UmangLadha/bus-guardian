import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import type {
  CreateDriverDto,
  // DriverDataTypes,
  ModalStateHandler,
} from "../../../types/types";
import { deleteData, getData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../../redux/reduxHooks/reduxHooks";
import { setDrivers } from "../../../redux/features/driver/driverSlice";

function DriverDataTable({
  setOpenModal,
  setSelectedData,
  setIsEditMode,
}: ModalStateHandler<CreateDriverDto>) {
  const dispatch = useAppDispatch();
  const [tableContent, setTableContent] = useState<CreateDriverDto[]>([]);

  useEffect(() => {
    async function fetchBusRoutes() {
      const { data, error } = await getData("/driver");
      if (data) {
        setTableContent(data.drivers);
        dispatch(setDrivers(data.drivers));
      }
      if (error) toast.error(error);
    }
    fetchBusRoutes();
  }, []);

  const actionEdit = (data: CreateDriverDto) => {
    setSelectedData(data);
    setIsEditMode(true);
    setOpenModal(true);
  };

  const actionDelete = async (id: string | undefined) => {
    const { response, error } = await deleteData(`/driver/${id}`);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(response.message || "Driver deleted successfully");
    setTableContent((prev) => prev.filter((driver) => driver._id !== id));
  };

  return (
    <tbody>
      {tableContent.map((data, index) => (
        <tr
          key={data._id}
          className="border-b border-gray-200 hover:bg-gray-50"
        >
          <td className="py-3 px-4 text-sm font-medium text-gray-900">
            {index + 1}
          </td>
          <td className="py-3 px-4 text-sm text-gray-700">{data.driverName}</td>
          <td className="py-3 px-4 text-sm text-gray-700">
            {data.driverPhoneNo}
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
              onClick={() => actionDelete(data?._id)}
              className="text-red-600 size-5 cursor-pointer"
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default DriverDataTable;
