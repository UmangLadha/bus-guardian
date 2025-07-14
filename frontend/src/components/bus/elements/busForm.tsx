import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import Button from "../../common/button/Button";
import toast from "react-hot-toast";
import SelectList from "../../common/formInputs/selectList";

interface busFormComponent {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function BusForm({ setOpenModal }: busFormComponent) {
  const [inputValue, setInputValue] = useState({
    busNumber: "",
    busCapacity: "",
    busDriver: "",
    busRoute: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const busData = {
      busNumber: inputValue.busNumber,
      busDriver: inputValue.busDriver,
      busRoute: inputValue.busRoute,
    };
    console.log("Bus Form Data:", busData);
    setTimeout(() => {
      toast.success("Bus Added Succesfully");
      setIsLoading(false);
      setInputValue({
        busNumber: "",
        busCapacity: "",
        busDriver: "",
        busRoute: "",
      });
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        value={inputValue.busNumber}
        onChange={(val) => handleInputChange("busCapacity", val)}
        required
      />

      <SelectList
        name="route"
        label="Route"
        value={inputValue.busRoute}
        onChange={(val) => handleInputChange("busRoute", val)}
        options={[
          {
            id: "vidhyadharNagar",
            name: "Vidhyadhar Nagar",
          },
          {
            id: "kalwarRoad",
            name: "Kalwar Road",
          },
          {
            id: "jhotwara",
            name: "Jhotwara",
          },
          {
            id: "murlipura",
            name: "Murlipura",
          },
          {
            id: "vaisahaliNagar",
            name: "Vaisahali Nagar",
          },
        ]}
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


      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          className="font-semibold bg-gray-400 text-white py-2 px-5 rounded-lg hover:bg-gray-500"
          btnText="Cancel"
          btnType="reset"
          onClick={() => setOpenModal(false)}
        />
        <Button
          btnType="submit"
          btnText="Submit"
          isLoading={isLoading}
          loadingText="Submitting..."
          className="w-32 bg-secondary flex items-center justify-center gap-3 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed" // Added hover
        />
      </div>
    </form>
  );
}

export default BusForm;
