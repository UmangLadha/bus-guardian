import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import Button from "../../common/button/Button";
import { HiOutlineX } from "react-icons/hi";

interface RouteFormTypes {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function RouteForm({ setOpenModal }: RouteFormTypes) {
  const [inputValue, setInputValue] = useState({
    routeName: "",
    routeList: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [routeList, setRouteList] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading(false);
    console.log("form Submitted");
  }

  function AddRoute(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  if (inputValue.routeList.trim() === "") {
    return;
  }
  setRouteList((prev) => [...prev, inputValue.routeList]);
  setInputValue((prev) => ({
    ...prev,
    routeList: "",
  }));
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full gap-4">
        <TextInput
          name="routeName"
          label="Route Name"
          type="text"
          placeholder="Enter Route name"
          value={inputValue.routeName}
          onChange={(val) => handleInputChange("routeName", val)}
          required
        />

        <div>
          <div className="flex items-baseline-last ">
            <TextInput
              name="routeList"
              type="text"
              label="Route List"
              placeholder="Enter Route"
              value={inputValue.routeList}
              onChange={(val) => handleInputChange("routeList", val)}
              required
            />
            <Button
              btnText="Add"
              btnType="button"
              onClick={AddRoute}
              className="bg-green-600 py-2.5 px-6 rounded-lg text-white font-semibold hover:bg-green-700"
            />
          </div>
          <div className="w-full h-60 px-3 py-2 border border-amber-200 rounded-lg overflow-y-auto">
            {routeList.map((list) => (
              <div className="font-semibold text-lg py-1.5 px-1 flex items-center border-b justify-between">
                {list}
                <span>
                  <HiOutlineX
                    className="size-5 cursor-pointer"
                    onClick={() => setOpenModal(false)}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

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
    </>
  );
}

export default RouteForm;
