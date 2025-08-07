import TextInput from "../../common/formInputs/textInput";
import SelectList from "../../common/formInputs/selectList";
import type {
  BusFormData,
  CreateBusDto,
  FormProps,
} from "../../../types/types";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import FormButton from "../../common/model/elements/formButtons";
import { useForm } from "../../../hooks/useForm";

function BusForm({
  setOpenModal,
  selectedData,
  isEditMode,
}: FormProps<CreateBusDto>) {
  const routes = useAppSelector((state: RootState) => state.Route.routes);
  const drivers = useAppSelector((state: RootState) => state.Driver.driver);

  const { formData, handleInputChange, handleSubmit, isLoading } =
    useForm<BusFormData>({
      endpoint: "/bus",
      queryKey: ["buses"],
      initialData: {
        _id: selectedData._id,
        busNumber: selectedData.busNumber || "",
        busCapacity: selectedData.busCapacity || "",
        busDriverId: selectedData.assignedDriver?._id || "",
        busRouteId: selectedData.assignedRoute?._id || "",
      },
      onSuccess: () => setOpenModal(false),
    });

  return (
    <form
      onSubmit={(e) => handleSubmit(e, isEditMode)}
      className="flex flex-col justify-between mx-auto items-center w-full"
    >
      <TextInput
        name="busNumber"
        label="Bus Number"
        type="text"
        placeholder="Enter Bus Number"
        value={formData.busNumber}
        onChange={(val) => handleInputChange("busNumber", val)}
        required
      />

      <TextInput
        name="busCapacity"
        label="Bus Capacity"
        type="number"
        min={1}
        max={100}
        placeholder="Bus Capacity"
        value={formData.busCapacity}
        onChange={(val) => handleInputChange("busCapacity", val)}
        required
      />

      <SelectList
        name="route"
        label="Route"
        value={formData.busRouteId}
        onChange={(val) => handleInputChange("busRouteId", val)}
        options={routes.map((route) => ({
          id: route._id,
          name: route.routeName,
        }))}
      />

      <SelectList
        name="driver"
        label="Driver"
        value={formData.busDriverId}
        onChange={(val) => handleInputChange("busDriverId", val)}
        options={drivers.map((driver) => ({
          id: driver._id,
          name: driver.driverName,
        }))}
      />

      <FormButton
        setOpenModal={setOpenModal}
        isEditMode={isEditMode}
        isLoading={isLoading}
      />
    </form>
  );
}

export default BusForm;
