import { useState } from "react";
import TextInput from "../../common/formInputs/textInput";

function BusForm() {
  const [inputValue, setInputValue] = useState({
    busID: "",
    busName: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <form
      action="submit"
      className="flex flex-col justify-between mx-auto items-center w-full"
    >
      <TextInput
        name="busId"
        label="Bus ID"
        type="text"
        placeholder="Enter Bus ID"
        value={inputValue.busID}
        onChange={(val) => handleInputChange("busID", val)}
        required
      />
      <TextInput
        name="busName"
        label="Bus Name"
        type="text"
        placeholder="Enter Bus Name"
        value={inputValue.busName}
        onChange={(val) => handleInputChange("busID", val)}
        required
      />
    </form>
  );
}

export default BusForm;
