import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import type {
  BusDataTypes,
  CreateDriverDto,
  ModalStateHandler,
} from "../../../types/types";
import Button from "../../common/button/Button";
import SelectList from "../../common/formInputs/selectList";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import { postData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";

function DriverForm({ setOpenModal }: ModalStateHandler) {
  const [inputValue, setInputValue] = useState({
    driverName: "",
    phoneNo: "",
    busNumber: "",
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
    // console.log("Route error:", error);
    // console.log("Route message", message);
    // console.log("Route Data", data);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const driverData = {
      driverName: inputValue.driverName,
      driverPhoneNo: inputValue.phoneNo,
      busNumber: inputValue.busNumber,
    };
    console.log("driver Data: s",driverData)
    sendDataToServer(driverData);
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
          btnText="Submit"
          isLoading={isLoading}
          loadingText="Submitting..."
          className="w-32 bg-secondary flex items-center justify-center gap-3 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </form>
  );
}

export default DriverForm;
