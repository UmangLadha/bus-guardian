import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import type { CreateDriverDto, ModalStateHandler } from "../../../types/types";
import { deleteData, getData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setDrivers } from "../../../redux/features/driver/driverSlice";
import { useAppDispatch } from "../../../redux/reduxHooks/reduxHooks";
import Modal from "../../common/model/modal";
import DeleteModal from "../../common/deleteModal/deleteModal";
import { useState } from "react";

function DriverDataTable({
  setOpenModal,
  setSelectedData,
  setIsEditMode,
}: ModalStateHandler<CreateDriverDto>) {
  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  async function fetchDrivers() {
    const { data, error } = await getData("/driver");
    if (error) toast.error(error);
    if (data) {
      dispatch(setDrivers(data.drivers));
    }
    return data?.drivers || [];
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["drivers"],
    queryFn: fetchDrivers,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error, response } = await deleteData(`/driver/${id}`);
      if (error) toast.error(error);
      return response;
    },
    onSuccess: (res) => {
      toast.success(res?.message || "Driver deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete driver");
    },
  });

  const actionDelete = (id: string | undefined) => {
    if (!id) return;
    deleteMutation.mutate(id);
  };

  const actionEdit = (data: CreateDriverDto) => {
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
      {data.map((data: CreateDriverDto, index: number) => (
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

export default DriverDataTable;
