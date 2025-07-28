import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import SelectList from "../../common/formInputs/selectList";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import type { BusDataTypes, ModalStateHandler } from "../../../types/types";
import Button from "../../common/button/Button";
import { setFormLoading } from "../../../redux/features/submitingForm/formSlice";

function StudentForm({ setOpenModal }: ModalStateHandler) {
  const [inputValue, setInputValue] = useState({
    studentId: "",
    studentName: "",
    mobileNumber: "",
    pickupPoint: "",
    busNumber: "",
  });
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state: RootState) => state.form.isLoading);

  const buses = useAppSelector((state: RootState) => state.Bus.buses);
  // const routes = useAppSelector((state: RootState) => state.Route.routes);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFormLoading(true));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between mx-auto items-center w-full"
    >
      <TextInput
        name="studentId"
        label="Student ID"
        type="text"
        placeholder="Enter Student ID"
        value={inputValue.studentId}
        onChange={(val) => handleInputChange("studentId", val)}
        required
      />
      <TextInput
        name="studentName"
        label="Student Name"
        type="text"
        placeholder="Enter Student Name"
        value={inputValue.studentName}
        onChange={(val) => handleInputChange("studentName", val)}
        required
      />
      <TextInput
        name="mobileNumber"
        label="Mobile Number"
        type="tel"
        maxLength={10}
        placeholder="Enter Mobile Number"
        value={inputValue.mobileNumber}
        onChange={(val) => handleInputChange("mobileNumber", val)}
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
      <SelectList
        name="pickupPoint"
        label="Route"
        value={inputValue.pickupPoint}
        onChange={(val) => handleInputChange("pickupPoint", val)}
        options={buses.map((route: BusDataTypes) => ({
          id: route.assignedRoute?._id,
          name: route.assignedRoute?.busRoute,
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

export default StudentForm;
