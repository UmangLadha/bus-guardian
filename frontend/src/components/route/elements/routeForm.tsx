import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import Button from "../../common/button/Button";
import { HiOutlineX } from "react-icons/hi";
import { postData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";

interface RouteFormTypes {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function RouteForm({ setOpenModal }: RouteFormTypes) {
  const [inputValue, setInputValue] = useState({
    routeName: "",
    routeList: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [routeListBox, setRouteListBox] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  function AddRoute(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (inputValue.routeList.trim() === "") {
      return;
    }
    setRouteListBox((prev) => [...prev, inputValue.routeList]);
    setInputValue((prev) => ({
      ...prev,
      routeList: "",
    }));
  }

  const submitData = async (routeData: {
    routeName: string;
    routeList: string[];
  }) => {
    const { message, error } = await postData(
      "/route/register",
      routeData
    );
    // console.log("Route error:", error);
    // console.log("Route message", message);
    // console.log("Route Data", data);
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message || "Data Added Successfully");
      setInputValue({ routeName: "", routeList: "" });
      setRouteListBox([]);
      setOpenModal(false);
    }
    setIsLoading(false);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputValue.routeName.trim() || routeListBox.length === 0) {
      toast.error("Please enter route name and at least one route.");
      return;
    }
    setIsLoading(true);
    const routeData = {
      routeName: inputValue.routeName,
      routeList: routeListBox,
    };
    submitData(routeData);
  }

  function removeRoute(index: number) {
    const removedRoute = routeListBox.filter((_, id) => id !== index);
    setRouteListBox(removedRoute);
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
            />
            <Button
              btnText="Add"
              btnType="button"
              onClick={AddRoute}
              className="bg-green-600 py-2 px-6 rounded-lg text-white font-semibold hover:bg-green-700"
            />
          </div>
          <div className="w-full h-60 px-3 py-2 border border-amber-200 rounded-lg overflow-y-auto">
            {routeListBox.length === 0 ? (
              <p className="text-sm text-gray-400 text-center">No routes added yet</p>
            ) : (
              routeListBox.map((list, index) => (
                <div
                  key={index}
                  className="font-semibold text-md py-1 px-1 flex items-center justify-between"
                >
                  {list}
                  <span>
                    <HiOutlineX
                      className="size-5 cursor-pointer"
                      onClick={() => removeRoute(index)}
                    />
                  </span>
                </div>
              ))
            )}
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
