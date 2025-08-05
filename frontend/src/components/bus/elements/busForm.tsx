import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import toast from "react-hot-toast";
import SelectList from "../../common/formInputs/selectList";
import type {
  CreateBusDto,
  FormProps,
  CreateRouteDto,
} from "../../../types/types";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import { postData, updateData } from "../../../utils/apiHandlers";
import FormButton from "../../common/model/elements/formButtons";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../libs/queryClient";

function BusForm({
  setOpenModal,
  selectedData,
  isEditMode,
}: FormProps<CreateBusDto>) {
  const [inputValue, setInputValue] = useState({
    busNumber: selectedData.busNumber || "",
    busCapacity: selectedData.busCapacity || 0,
    busDriver: selectedData.assignedDriver?._id || "",
    busRoute: selectedData.assignedRoute?._id || "",
  });

  const routes = useAppSelector((state: RootState) => state.Route.routes);
  const drivers = useAppSelector((state: RootState) => state.Driver.driver);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setInputValue({
      busNumber: "",
      busCapacity: 0,
      busDriver: "",
      busRoute: "",
    });
  };

  const { mutate: createBus, isPending: isCreating } = useMutation({
    mutationFn: async (busData: CreateBusDto) =>
      await postData("/bus/register", busData),
    onSuccess: (res) => {
      toast.success(res.message || "Bus Added Successfull");
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      resetForm();
      setOpenModal(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to add bus");
    },
  });

  const { mutate: updateBus, isPending: isUpdating } = useMutation({
    mutationFn: async (dataToUpdate: CreateBusDto) =>
      await updateData(`/bus/${selectedData._id}`, dataToUpdate),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      toast.success(res.message || "Bus updated successfully");
      resetForm();
      setOpenModal(false);
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to update bus");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const busData = {
      busNumber: inputValue.busNumber,
      busCapacity: inputValue.busCapacity,
      busDriverId: inputValue.busDriver,
      busRouteId: inputValue.busRoute,
    };

    if (isEditMode && selectedData) {
      updateBus(busData);
    } else {
      createBus(busData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap w-full gap-4">
      <TextInput
        name="busNumber"
        label="Bus Number"
        type="text"
        placeholder="Enter Bus Number"
        value={inputValue.busNumber}
        onChange={(val) => handleInputChange("busNumber", val)}
        required
      />

      <TextInput
        name="busCapacity"
        label="Bus Capacity"
        type="number"
        placeholder="Bus Capacity"
        value={inputValue.busCapacity}
        onChange={(val) => handleInputChange("busCapacity", val)}
        required
      />

      <SelectList
        name="route"
        label="Route"
        value={inputValue.busRoute}
        onChange={(val) => handleInputChange("busRoute", val)}
        options={routes.map((route: CreateRouteDto) => ({
          id: route._id,
          name: route.routeName,
        }))}
      />

      <SelectList
        name="driver"
        label="Driver"
        value={inputValue.busDriver}
        onChange={(val) => handleInputChange("busDriver", val)}
        options={drivers.map((driver) => ({
          id: driver._id,
          name: driver.driverName,
        }))}
      />

      <FormButton
        setOpenModal={setOpenModal}
        isEditMode={isEditMode}
        isLoading={isEditMode ? isUpdating : isCreating}
      />
    </form>
  );
}

export default BusForm;
