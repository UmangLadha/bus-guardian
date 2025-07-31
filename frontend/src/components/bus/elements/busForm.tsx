import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import Button from "../../common/button/Button";
import toast from "react-hot-toast";
import SelectList from "../../common/formInputs/selectList";
import type {
  ModalStateHandler,
  CreateBusDto,
  RouteDataTypes,
} from "../../../types/types";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import { postData } from "../../../utils/apiHandlers";

function BusForm({ setOpenModal }: ModalStateHandler) {
  const [inputValue, setInputValue] = useState({
    busNumber: "",
    busCapacity: 0,
    busDriver: "",
    busRoute: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const routes = useAppSelector((state: RootState) => state.Route.routes);
  const drivers = useAppSelector((state: RootState) => state.Driver.driver);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const sendBusDataToServer = async (busData: CreateBusDto) => {
    const { message, error } = await postData("/bus/register", busData);
    if (error) {
      toast.error(error);
      setIsLoading(false);
    }
    if (message) {
      toast.success(message || "Bus Added Successfull");
      setInputValue({
        busNumber: "",
        busCapacity: 0,
        busDriver: "",
        busRoute: "",
      });
      setIsLoading(false);
      setOpenModal(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const busData = {
      busNumber: inputValue.busNumber,
      busCapacity: inputValue.busCapacity,
      busDriverId: inputValue.busDriver,
      busRouteId: inputValue.busRoute,
    };
    sendBusDataToServer(busData);
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
        options={routes.map((route: RouteDataTypes) => ({
          id: route._id,
          name: route.routeName,
        }))}
        required
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

export default BusForm;
