import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import Button from "../../common/button/Button";
import toast from "react-hot-toast";
import SelectList from "../../common/formInputs/selectList";
import axios, { AxiosError } from "axios";
import type {
  ModalStateHandler,
  CreateBusDto,
  RouteDataTypes,
} from "../../../types/types";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";

function BusForm({ setOpenModal }: ModalStateHandler) {
  const [inputValue, setInputValue] = useState({
    busNumber: "",
    busCapacity: 0,
    busDriver: "",
    busRoute: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const routes = useAppSelector((state: RootState) => state.Route.routes);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const sendBusDataToServer = async (busData: CreateBusDto) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/bus/register`,
        busData
      );
      toast.success(response.data.message || "Bus Added Successfull");
      setInputValue({
        busNumber: "",
        busCapacity: 0,
        busDriver: "",
        busRoute: "",
      });
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Please try again later!");
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const busData = {
      busNumber: inputValue.busNumber,
      busCapacity: inputValue.busCapacity,
      busDriver: inputValue.busDriver,
      busRoute: inputValue.busRoute,
    };
    sendBusDataToServer(busData);
    console.log("Bus Form Data:", busData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap w-full gap-4">
      <TextInput
        name="busNumber"
        label="Bus Number"
        type="text"
        placeholder="Enter Bus ID"
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
        options={[
          {
            id: "DonaldTrump",
            name: "Donald Trump",
          },
          {
            id: "MohammadYunus",
            name: "Mohammad Yunus",
          },
          {
            id: "ShahbazSarif",
            name: "Shahbaz Sarif",
          },
          {
            id: "AsimMunir",
            name: "Asim Munir",
          },
        ]}
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

export default BusForm;
