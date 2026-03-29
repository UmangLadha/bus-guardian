import TextInput from "../../common/formInputs/textInput";
import type {
  CreateDriverDto,
  DriverFormData,
  FormProps,
} from "../../../types/types";
import SelectList from "../../common/formInputs/selectList";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import FormButton from "../../common/model/elements/formButtons";
import { useForm } from "../../../hooks/useForm";

function DriverForm({
  setOpenModal,
  selectedData,
  isEditMode,
}: FormProps<CreateDriverDto>) {
  const buses = useAppSelector((state: RootState) => state.Bus.buses);

  const { formData, handleInputChange, handleSubmit, isLoading } =
    useForm<DriverFormData>({
      endpoint: "/driver",
      queryKey: ["drivers"],
      initialData: {
        _id: selectedData._id,
        driverName: selectedData?.driverName || "",
        driverPhoneNo: selectedData?.driverPhoneNo || "",
        busId: selectedData.assignedBus?._id || "",
      },
      onSuccess: () => setOpenModal(false),
    });

  return (
    <form
      onSubmit={(e) => handleSubmit(e, isEditMode)}
      className="w-full gap-4"
    >
      <TextInput
        name="driverName"
        label="Driver Name"
        type="text"
        placeholder="Enter Driver Name"
        value={formData.driverName}
        onChange={(val) => handleInputChange("driverName", val)}
        required
      />
      <TextInput
        name="phoneNumber"
        label="Phone number"
        type="tel"
        maxLength={10}
        placeholder="Enter Phone Number"
        value={formData.driverPhoneNo}
        onChange={(val) => handleInputChange("driverPhoneNo", val)}
        required
      />
      <SelectList
        name="busNumber"
        label="Assign bus"
        value={formData.busId}
        onChange={(val) => handleInputChange("busId", val)}
        options={buses.map((bus) => ({
          id: bus._id,
          name: bus.busNumber,
        }))}
        required
      />
      <FormButton
        setOpenModal={setOpenModal}
        isEditMode={isEditMode}
        isLoading={isLoading}
      />
    </form>
  );
}

export default DriverForm;
