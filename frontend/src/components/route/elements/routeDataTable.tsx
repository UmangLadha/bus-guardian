import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, getData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";
import type { CreateRouteDto, ModalStateHandler} from "../../../types/types";
import { useAppDispatch } from "../../../redux/reduxHooks/reduxHooks";
import { setRoutes } from "../../../redux/features/route/routeSlice";

function RouteDataTable({ setOpenModal, setSelectedData, setIsEditMode }: ModalStateHandler<CreateRouteDto>) {
  const [tableContent, setTableContent] = useState<CreateRouteDto[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchBusRoutes() {
      const { data, error } = await getData("/route");
      // console.log("Data:", data);
      // console.log("Error:", error);
      if (data) {
        setTableContent(data.Routes);
        dispatch(setRoutes(data.Routes));
      }
      if (error) toast.error(error);
    }
    fetchBusRoutes();
  }, []);

  const actionEdit = (data:CreateRouteDto) => {
    setSelectedData(data);
    setIsEditMode(true);
    setOpenModal(true);
  };

  const actionDelete = async (id: string | undefined) => {
    const { response, error } = await deleteData(`/route/${id}`);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(response.message || "Route deleted successfully");
    setTableContent((prev) =>
      prev.filter((route: CreateRouteDto) => route._id !== id)
    );
  };

  return (
    <tbody>
      {tableContent.length === 0 ? (
        <tr>
          <td colSpan={4} className="text-center py-4">
            Loading routes...
          </td>
        </tr>
      ) : (
        tableContent?.map((data: CreateRouteDto) => (
          <tr
            key={data._id}
            className="border-b border-gray-200 hover:bg-gray-50"
          >
            <td className="py-3 px-4 text-sm font-medium text-gray-900">
              {data.routeName}
            </td>
            <td className="py-3 px-4 text-sm text-gray-900">
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                {data.routeList.map((detail, index) => (
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
                onClick={()=>actionEdit(data)}
                className="text-amber-500 size-5 cursor-pointer"
              />
              <MdDeleteOutline
                title="Delete"
                onClick={() => actionDelete(data._id)}
                className="text-red-600 size-5 cursor-pointer"
              />
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
}

export default RouteDataTable;
