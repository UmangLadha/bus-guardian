import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import type {
  CreateBusDto,
  CreateDriverDto,
  FormProps,
} from "../../../types/types";
import SelectList from "../../common/formInputs/selectList";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import { postData, updateData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";
import FormButton from "../../common/model/elements/formButtons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function DriverForm({
  setOpenModal,
  selectedData,
  isEditMode,
}: FormProps<CreateDriverDto>) {
  const [inputValue, setInputValue] = useState({
    driverName: selectedData?.driverName || "",
    phoneNo: selectedData?.driverPhoneNo || "",
    busNumber: selectedData.assignedBus?._id || "",
  });
  const buses = useAppSelector((state: RootState) => state.Bus.buses);
  const queryClient = useQueryClient();

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setInputValue({ driverName: "", phoneNo: "", busNumber: "" });
  };

  const { mutate: createDriver, isPending: isCreating } = useMutation({
    mutationFn: async (driverData: CreateDriverDto) =>
      await postData("/driver/register", driverData),
    onSuccess: (res) => {
      toast.success(res.message || "Driver added successfully");
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      resetForm();
      setOpenModal(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to add driver");
    },
  });

  const { mutate: updateDriver, isPending: isUpdating } = useMutation({
    mutationFn: async (driverData: CreateDriverDto) =>
      await updateData(`/driver/${selectedData?._id}`, driverData),
    onSuccess: (res) => {
      toast.success(res.message || "Driver updated successfully");
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      resetForm();
      setOpenModal(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update driver");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const driverData = {
      driverName: inputValue.driverName,
      driverPhoneNo: inputValue.phoneNo,
      busID: inputValue.busNumber,
    };

    if (isEditMode && selectedData) {
      updateDriver(driverData);
    } else {
      createDriver(driverData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between mx-auto items-center w-full"
    >
      <TextInput
        name="driverName"
        label="Driver Name"
        type="text"
        placeholder="Enter Driver Name"
        value={inputValue.driverName}
        onChange={(val) => handleInputChange("driverName", val)}
        required
      />
      <TextInput
        name="phoneNumber"
        label="Phone number"
        type="tel"
        maxLength={10}
        placeholder="Enter Phone Number"
        value={inputValue.phoneNo}
        onChange={(val) => handleInputChange("phoneNo", val)}
        required
      />
      <SelectList
        name="busNumber"
        label="Assign bus"
        value={inputValue.busNumber}
        onChange={(val) => handleInputChange("busNumber", val)}
        options={buses.map((bus: CreateBusDto) => ({
          id: bus._id,
          name: bus.busNumber,
        }))}
        required
      />
      <FormButton
        setOpenModal={setOpenModal}
        isEditMode={isEditMode}
        isLoading={isEditMode ? isUpdating : isCreating}
      />
    </form>
  );
}

export default DriverForm;
