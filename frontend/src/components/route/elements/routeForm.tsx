import React, { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import Button from "../../common/button/Button";
import { HiOutlineX } from "react-icons/hi";
import { postData, updateData } from "../../../utils/apiHandlers";
import toast from "react-hot-toast";
import type { CreateRouteDto, FormProps } from "../../../types/types";
import FormButton from "../../common/model/elements/formButtons";
function RouteForm({
  setOpenModal,
  isEditMode,
  selectedData,
}: FormProps<CreateRouteDto>) {
  const [isLoading, setIsLoading] = useState(false);
  const [routeListBox, setRouteListBox] = useState<string[]>(
    selectedData.routeList
      ? selectedData.routeList.map((item) => item.locationName)
      : []
  );
  const [inputValue, setInputValue] = useState({
    routeName: selectedData.routeName || "",
    routeList: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setInputValue({ routeName: "", routeList: "" });
    setRouteListBox([]);
  };

  const AddRoute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.routeList.trim() === "") {
      return;
    }
    if (routeListBox.includes(inputValue.routeList.trim())) {
      toast.error("Route already added");
      return;
    }
    setRouteListBox((prev) => [...prev, inputValue.routeList]);
    setInputValue((prev) => ({
      ...prev,
      routeList: "",
    }));
  };

  const sendDataToServer = async (routeData: {
    routeName: string;
    routeList: string[];
  }) => {
    const { message, error } = await postData("/route/register", routeData);
    if (message) {
      toast.success(message || "Route added successfully");
      resetForm();
      setOpenModal(false);
    }
    if (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  const handleUpdateData = async (dataToUpdate: {
    routeName: string;
    routeList: string[];
  }) => {
    const { message, error } = await updateData(
      `/route/${selectedData._id}`,
      dataToUpdate
    );
    if (message) {
      toast.success(message || "Route updated successfully");
      resetForm();
      setOpenModal(false);
    }
    if (error) {
      toast.error(error);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    if (selectedData && isEditMode) {
      handleUpdateData(routeData);
    } else {
      sendDataToServer(routeData);
    }
  };

  const removeRoute = (index: number) => {
    const removedRoute = routeListBox.filter((_, id) => id !== index);
    setRouteListBox(removedRoute);
  };

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
              btnText="Add Stop"
              btnType="button"
              onClick={AddRoute}
              className="bg-green-600 py-2 px-2 w-36 rounded-lg text-white font-semibold hover:bg-green-700"
            />
          </div>
          <div className="w-full h-60 px-3 py-2 border border-amber-200 rounded-lg overflow-y-auto">
            {routeListBox.length === 0 ? (
              <p className="text-sm text-gray-400 text-center">
                No routes added yet
              </p>
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
        <FormButton
          setOpenModal={setOpenModal}
          isEditMode={isEditMode}
          isLoading={isLoading}
        />
      </form>
    </>
  );
}

export default RouteForm;
