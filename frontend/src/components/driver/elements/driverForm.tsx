import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import type {
  CreateBusDto,
  // BusDataTypes,
  CreateDriverDto,
  FormProps,
} from "../../../types/types";
import SelectList from "../../common/formInputs/selectList";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import { postData, updateData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";
import FormButton from "../../common/model/elements/formButtons";

function DriverForm({
  setOpenModal,
  selectedData,
  isEditMode,
}: FormProps<CreateDriverDto>) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    driverName: selectedData?.driverName || "",
    phoneNo: selectedData?.driverPhoneNo || "",
    busNumber: selectedData.assignedBus?._id || "",
  });
  const buses = useAppSelector((state: RootState) => state.Bus.buses);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFrom = () => {
    setInputValue({ driverName: "", phoneNo: "", busNumber: "" });
  };

  const sendDataToServer = async (driverData: CreateDriverDto) => {
    const { message, error } = await postData("/driver/register", driverData);
    if (message) {
      toast.success(message || "Data Added Successfully");
      resetFrom();
      setOpenModal(false);
    }
    if (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  const handleUpdataData = async (dataToUpdate: CreateDriverDto) => {
    const { error, message } = await updateData(
      `/driver/${selectedData._id}`,
      dataToUpdate
    );
    if (message) {
      toast.success(message || "Data Updated successfully");
      resetFrom();
      setOpenModal(false);
    }
    if (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const driverData = {
      driverName: inputValue.driverName,
      driverPhoneNo: inputValue.phoneNo,
      busID: inputValue.busNumber,
    };

    if (isEditMode && selectedData) {
      handleUpdataData(driverData);
    } else {
      sendDataToServer(driverData);
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
        isLoading={isLoading}
      />
    </form>
  );
}

export default DriverForm;
