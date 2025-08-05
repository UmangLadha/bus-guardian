import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { deleteData, getData } from "../../../utils/apiHandlers";
import type { ModalStateHandler, CreateBusDto } from "../../../types/types";
import { useAppDispatch } from "../../../redux/reduxHooks/reduxHooks";
import { setbus } from "../../../redux/features/bus/busSlice";
import DeleteModal from "../../common/deleteModal/deleteModal";
import Modal from "../../common/model/modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../libs/queryClient";

function BusDataTable({
  setOpenModal,
  setSelectedData,
  setIsEditMode,
}: ModalStateHandler<CreateBusDto>) {
  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useAppDispatch();

  async function fetchBusData() {
    const { data, error } = await getData("/bus");
    if (error) toast.error(error);
    if (data) {
      dispatch(setbus(data.buses));
    }
    return data.buses || [];
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["buses"],
    queryFn: fetchBusData,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { response, error } = await deleteData(`/bus/${id}`);
      if (error) toast.error(error);
      return response;
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Bus deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete bus");
    },
  });

  const actionDelete = async (id: string | undefined) => {
    if (!id) return;
    deleteMutation.mutate(id);
  };

  const actionEdit = (data: CreateBusDto) => {
    setSelectedData(data);
    setIsEditMode(true);
    setOpenModal(true);
  };

  if (isLoading)
    return (
      <tbody>
        <tr>
          <td colSpan={5}>Loading...</td>
        </tr>
      </tbody>
    );

  if (isError)
    return (
      <tbody>
        <tr>
          <td colSpan={5}>Error fetching data.</td>
        </tr>
      </tbody>
    );

  return (
    <tbody>
      {data.map((data: CreateBusDto) => (
        <tr
          key={data._id}
          className="border-b border-gray-200 hover:bg-gray-50"
        >
          <td className="py-3 px-4 text-sm font-medium text-gray-900">
            {data.busNumber}
          </td>
          <td className="py-3 px-4 text-sm text-gray-700">
            {data.assignedDriver?.driverName || " - "}
          </td>
          <td className="py-3 px-4 text-sm text-gray-700">
            {data.assignedRoute?.busRoute || " - "}
          </td>
          <td className="py-3 px-4 text-sm text-gray-700">
            {data.busCapacity}
          </td>
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
        </tr>
      ))}
    </tbody>
  );
}

export default BusDataTable;
