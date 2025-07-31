import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, getData } from "../../../utils/apiHandlers";
import type { ModalStateHandler, BusDataTypes } from "../../../types/types";
import { useAppDispatch } from "../../../redux/reduxHooks/reduxHooks";
import { setbus } from "../../../redux/features/bus/busSlice";

function BusDataTable({ setOpenModal }: ModalStateHandler) {
  const [tableContent, setTableContent] = useState<BusDataTypes[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchBusData() {
      const { data, error } = await getData("/bus");
      // console.log("Data:", data); ////////////////////
      // console.log("Error:", error); ////////////////////
      if (data) {
        setTableContent(data.buses);
        dispatch(setbus(data.buses));
      }
      if (error) toast.error(error);
    }
    fetchBusData();
  }, []);

  const actionEdit = () => {
    setOpenModal(true);
  };

  const actionDelete = async (id: string) => {
    // console.log("Deleting bus with ID:", id);
    const { response, error } = await deleteData(`/bus/${id}`);
    // console.log("bus deleted response: ", response);
    // console.log("error on deleting bus: ", error);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(response.message || "Route deleted successfully");
    setTableContent((prev) => prev.filter((bus) => bus._id !== id));
  };

  return (
    <tbody>
      {tableContent.length > 0 &&
        tableContent?.map((data: BusDataTypes) => (
          <tr
            key={data._id}
            className="border-b border-gray-200 hover:bg-gray-50"
          >
            <td className="py-3 px-4 text-sm font-medium text-gray-900">
              {data.busNumber}
            </td>
            <td className="py-3 px-4 text-sm text-gray-700">
              {data.assignedDriver?.driverName}
            </td>
            <td className="py-3 px-4 text-sm text-gray-700">
              {data.assignedRoute?.busRoute}
            </td>
            <td className="py-3 px-4 text-sm text-gray-700">
              {data.busCapacity}
            </td>
            <td className="py-3 px-4 flex gap-4 items-center">
              <FaRegEdit
                title="Update"
                onClick={actionEdit}
                className="text-amber-500 size-5 cursor-pointer"
              />
              <MdDeleteOutline
                title="Delete"
                onClick={() => actionDelete(data._id)}
                className="text-red-600 size-5 cursor-pointer"
              />
            </td>
          </tr>
        ))}
    </tbody>
  );
}

export default BusDataTable;
