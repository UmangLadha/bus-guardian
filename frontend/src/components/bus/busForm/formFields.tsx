import { useState } from "react";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { CreateBusDto, CreateRouteDto } from "../../../types/types";
import SelectList from "../../common/formInputs/selectList";
import TextInput from "../../common/formInputs/textInput";
import type { RootState } from "../../../redux/app/store";

function FormFields(selectedData: CreateBusDto) {
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

  return (
    <>
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
    </>
  );
}

export default FormFields;
