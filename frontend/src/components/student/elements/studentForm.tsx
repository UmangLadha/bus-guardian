// import TextInput from "../../common/formInputs/textInput";
// import SelectList from "../../common/formInputs/selectList";
// import { useAppSelector } from "../../../redux/reduxHooks/reduxHooks";
// import type { RootState } from "../../../redux/app/store";
// import type {
//   CreateBusDto,
//   CreateStudentDto,
//   FormProps,
//   StudentFormData,
// } from "../../../types/types";
// import { useForm } from "../../../hooks/useForm";
// import FormButton from "../../common/model/elements/formButtons";

// function StudentForm({
//   setOpenModal,
//   selectedData,
//   isEditMode,
// }: FormProps<CreateStudentDto>) {
//   const buses = useAppSelector((state: RootState) => state.Bus.buses);
//   const routes = useAppSelector((state: RootState) => state.Route.routes);

//   const { handleInputChange, handleSubmit, isLoading, formData } =
//     useForm<StudentFormData>({
//       endpoint: "/student",
//       queryKey: ["students"],
//       initialData: {
//         _id: selectedData._id,
//         studentId: selectedData.studentId || "",
//         studentName: selectedData.studentName || "",
//         parentPhoneNo: selectedData.parentPhoneNo || "",
//         busId: selectedData.assignedBus?._id || "",
//         routeId: selectedData.assignedRoute?._id || "",
//         pickupPoint: selectedData.pickupPoint || "",
//       },
//       onSuccess: () => setOpenModal(false),
//     });
//   return (
//     <form
//       onSubmit={(e) => handleSubmit(e, isEditMode)}
//       className="flex flex-col justify-between mx-auto items-center w-full"
//     >
//       <TextInput
//         name="studentId"
//         label="Student ID"
//         type="text"
//         placeholder="Enter Student ID"
//         value={formData.studentId}
//         onChange={(val) => handleInputChange("studentId", val)}
//         required
//       />
      
//       <TextInput
//         name="studentName"
//         label="Student Name"
//         type="text"
//         placeholder="Enter Student Name"
//         value={formData.studentName}
//         onChange={(val) => handleInputChange("studentName", val)}
//         required
//       />
//       <TextInput
//         name="parentPhoneNo"
//         label="Phone Number"
//         type="tel"
//         maxLength={10}
//         minLength={10}
//         placeholder="Enter Mobile Number"
//         value={formData.parentPhoneNo}
//         onChange={(val) => handleInputChange("parentPhoneNo", val)}
//         required
//       />
//       <SelectList
//         name="busId"
//         label="Assign bus"
//         value={formData.busId}
//         onChange={(val) => handleInputChange("busId", val)}
//         options={buses.map((bus: CreateBusDto) => ({
//           id: bus._id,
//           name: bus.busNumber,
//         }))}
//         required
//       />
//       <SelectList
//         name="routeId"
//         label="Route"
//         value={formData.routeId}
//         onChange={(val) => handleInputChange("routeId", val)}
//         options={routes.map((route) => ({
//           id: route._id,
//           name: route.routeName,
//         }))}
//         required
//       />
//       <FormButton
//         setOpenModal={setOpenModal}
//         isEditMode={isEditMode}
//         isLoading={isLoading}
//       />
//     </form>
//   );
// }

// export default StudentForm;

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
  RouteDetails
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

  // States for route management
  const [selectedBus, setSelectedBus] = useState(selectedData.assignedBus?._id || "");
  const [routeDetails, setRouteDetails] = useState<RouteDetails| null>(null);
  const [locationsList, setLocationsList] = useState<Location[]>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);

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
        routeId: selectedData.assignedRoute?._id || "",
        pickupLocation: selectedData.pickupLocation || "", // pickup point field
      },
      onSuccess: () => setOpenModal(false),
    });

  // Function to fetch route details from API
  const fetchRouteDetails = async (busId: string) => {
    try {
      setLoadingRoute(true);
      const selectedBusData = buses.find(bus => bus._id === busId);
      console.log("selected bus data:", selectedBusData);
      if (selectedBusData && selectedBusData.assignedRoute) {
        const id = selectedBusData.assignedRoute._id;
        
        // API call to get full route details
        const response = await getDataById(`/route/${id}`);
        const routeData = response.data.route;
        setRouteDetails(routeData);
        setLocationsList(routeData.locationsList || []);
        // Auto-set route ID in form
        handleInputChange("routeId", routeData._id);
        
      } else {
        // If no route assigned to bus
        setRouteDetails(null);
        setLocationsList([]);
        handleInputChange("routeId", "");
        handleInputChange("pickupLocation", "");
      }
    } catch (error) {
      console.error("Error fetching route details:", error);
      setRouteDetails(null);
      setLocationsList([]);
    } finally {
      setLoadingRoute(false);
    }
  };

  // Effect to fetch route when bus is selected
  useEffect(() => {
    if (selectedBus) {
      fetchRouteDetails(selectedBus);
    } else {
      setRouteDetails(null);
      setLocationsList([]);
    }
  }, [selectedBus, buses]);

  const handleBusChange = (busId: string) => {
    setSelectedBus(busId);
    handleInputChange("busId", busId);
    // Reset pickup location when bus changes
    handleInputChange("pickupLocation", "");
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, isEditMode)}
      className="flex flex-col justify-between mx-auto items-center w-full"
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

      {/* Bus Selection */}
      <SelectList
        name="busId"
        label="Assign Bus"
        value={formData.busId}
        onChange={handleBusChange}
        options={buses.map((bus: CreateBusDto) => ({
          id: bus._id,
          name: `${bus.busNumber} - ${bus.assignedRoute?.routeName || 'No Route'}`,
        }))}
        required
      />

      {/* Loading state for route */}
      {loadingRoute && (
        <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-600 text-sm">🔄 Route details load ho rahi hai...</p>
        </div>
      )}

      {/* Route Information Display */}
      {routeDetails && !loadingRoute && (
        <div className="w-full p-3 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Selected Route:</h4>
          <p className="text-sm text-green-700">{routeDetails.routeName}</p>
        </div>
      )}

      {/* Pickup Location Selection */}
      {locationsList.length > 0 && !loadingRoute && (
        <div className="w-full">
          <SelectList
            name="pickupLocation"
            label="Select Pickup Location"
            value={formData.pickupLocation}
            onChange={(val) => handleInputChange("pickupLocation", val)}
            options={locationsList.map((location:Location) => ({
              id: location._id,
              name: location.locationName,
            }))}
            // placeholder="Choose your pickup location"
            required
          />
          
          {/* Route Locations Display */}
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-700 mb-2">Bus Route Locations:</h5>
            <div className="text-sm text-gray-600">
              {locationsList.map((location, index) => (
                <div key={location._id} className="flex items-center mb-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <span className="font-medium">{location.locationName}</span>
                    <br />
                    <span className="text-xs text-gray-500">
                      Lat: {location.latitude}, Long: {location.longitude}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Show message when bus has no route */}
      {selectedBus && !loadingRoute && locationsList.length === 0 && (
        <div className="w-full p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ⚠️ Is bus ka koi route assign nahi hai. Admin se contact karein.
          </p>
        </div>
      )}

      <FormButton
        setOpenModal={setOpenModal}
        isEditMode={isEditMode}
        isLoading={isLoading}
      />
    </form>
  );
}

export default StudentForm;
