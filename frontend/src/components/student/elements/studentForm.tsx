import { useState, useEffect } from "react";
import TextInput from "../../common/formInputs/textInput";
import SelectList from "../../common/formInputs/selectList";
import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
import type { RootState } from "../../../redux/app/store";
import type {
  CreateBusDto,
  CreateStudentDto,
  FormProps,
  StudentFormData,
  Location,
} from "../../../types/types";
import { useForm } from "../../../hooks/useForm";
import FormButton from "../../common/model/elements/formButtons";
import { getDataById } from "../../../utils/apiHandlers";

function StudentForm({
  setOpenModal,
  selectedData,
  isEditMode,
}: FormProps<CreateStudentDto>) {
  const buses = useAppSelector((state: RootState) => state.Bus.buses);

  const [selectedBus, setSelectedBus] = useState(
    selectedData.assignedBus?._id || ""
  );
  const [locationsList, setLocationsList] = useState<Location[]>([]);

  const { handleInputChange, handleSubmit, isLoading, formData } =
    useForm<StudentFormData>({
      endpoint: "/student",
      queryKey: ["students"],
      initialData: {
        _id: selectedData._id,
        studentId: selectedData.studentId || "",
        studentName: selectedData.studentName || "",
        parentPhoneNo: selectedData.parentPhoneNo || "",
        busId: selectedData.assignedBus?._id || "",
        checkpoint: selectedData.checkpoint || "",
      },
      onSuccess: () => setOpenModal(false),
    });

  const fetchRouteDetails = async (busId: string) => {
    try {
      const selectedBusData = buses.find((bus) => bus._id === busId);
      console.log("selected bus data:", selectedBusData);
      if (selectedBusData && selectedBusData.assignedRoute) {
        const id = selectedBusData.assignedRoute._id;
        const response = await getDataById(`/route/${id}`);
        const routeData = response.data.route;
        setLocationsList(routeData.locationsList || []);
      } else {
        setLocationsList([]);
        handleInputChange("pickupLocation", "");
      }
    } catch (error) {
      console.error("Error fetching route details:", error);
      setLocationsList([]);
    }
  };

  useEffect(() => {
    if (selectedBus) {
      fetchRouteDetails(selectedBus);
    } else {
      setLocationsList([]);
    }
  }, [selectedBus, buses]);

  const handleBusChange = (busId: string) => {
    setSelectedBus(busId);
    handleInputChange("busId", busId);
    handleInputChange("pickupLocation", "");
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, isEditMode)}
      className="w-full gap-4"
    >
      <TextInput
        name="studentId"
        label="Student ID"
        type="text"
        placeholder="Enter Student ID"
        value={formData.studentId}
        onChange={(val) => handleInputChange("studentId", val)}
        required
      />

      <TextInput
        name="studentName"
        label="Student Name"
        type="text"
        placeholder="Enter Student Name"
        value={formData.studentName}
        onChange={(val) => handleInputChange("studentName", val)}
        required
      />

      <TextInput
        name="parentPhoneNo"
        label="Phone Number"
        type="tel"
        maxLength={10}
        minLength={10}
        placeholder="Enter Mobile Number"
        value={formData.parentPhoneNo}
        onChange={(val) => handleInputChange("parentPhoneNo", val)}
        required
      />

      <SelectList
        name="busId"
        label="Assign Bus"
        value={formData.busId}
        onChange={handleBusChange}
        options={buses.map((bus: CreateBusDto) => ({
          id: bus._id,
          name: `${bus.busNumber}`,
        }))}
        required
      />

      <SelectList
        name="checkpoint"
        label="Select checkpoint"
        value={formData.checkpoint}
        onChange={(val) => handleInputChange("checkpoint", val)}
        options={locationsList.map((location: Location) => ({
          name: location.locationName,
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

export default StudentForm;
