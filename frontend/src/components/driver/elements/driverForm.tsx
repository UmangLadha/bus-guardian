import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import type {
  BusDataTypes,
  CreateDriverDto,
  FormProps,
} from "../../../types/types";
import Button from "../../common/button/Button";
import SelectList from "../../common/formInputs/selectList";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import { postData, updateData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";

function DriverForm({
  setOpenModal,
  selectedData,
  isEditMode,
}: FormProps<CreateDriverDto>) {
  const [inputValue, setInputValue] = useState({
    driverName: selectedData?.driverName || "",
    phoneNo: selectedData?.driverPhoneNo || "",
    busNumber: selectedData.assignedBus?.busNumber || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const buses = useAppSelector((state: RootState) => state.Bus.buses);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const sendDataToServer = async (driverData: CreateDriverDto) => {
    const { message, error } = await postData("/driver/register", driverData);
    if (message) {
      toast.success(message || "Data Added Successfully");
      setInputValue({ driverName: "", phoneNo: "", busNumber: "" });
      setIsLoading(false);
    }
    if (error) {
      toast.error(error);
    }
    setOpenModal(false);
  };

  const handleUpdataData = async (
    dataToUpdate: CreateDriverDto,
    id: string | undefined
  ) => {
    const { error, message } = await updateData(`/driver/${id}`, dataToUpdate);
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message || "Data Updated successfully");
      setInputValue({ driverName: "", phoneNo: "", busNumber: "" });
      setIsLoading(false);
    }
    setOpenModal(false);
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
      handleUpdataData(driverData, selectedData?._id);
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
        options={buses.map((bus: BusDataTypes) => ({
          id: bus._id,
          name: bus.busNumber,
        }))}
        required
      />
      <div className="flex items-center justify-center mx-auto gap-4 mt-5">
        <Button
          className="w-32 font-semibold bg-gray-400 text-white py-2 px-5 rounded-lg hover:bg-gray-500"
          btnText="Cancel"
          btnType="reset"
          onClick={() => setOpenModal(false)}
        />
        <Button
          btnType="submit"
          btnText={isEditMode ? "Update" : "Submit"}
          isLoading={isLoading}
          loadingText={isEditMode ? "Updating.." : "Submitting..."}
          className="w-32 bg-secondary flex items-center justify-center gap-3 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </form>
  );
}

export default DriverForm;
