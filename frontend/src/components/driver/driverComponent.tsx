import DriverForm from "./elements/driverForm";
import EntityManager from "../common/entityManager/entityManagr";
import DriverDataTable from "./elements/driverDataTable";

function DriverComponent() {
  return (
    <EntityManager
      componentName="Driver"
      title="Driver Management"
      description="Track all students using bus services"
      tableHeadings={[
        "Driver Name",
        "Phone No.",
        "Bus Assigned",
        "Action",
      ]}
      FormComponent={DriverForm}
      DataTableComponent={DriverDataTable}
      initialData={{
        driverName: "",
        driverPhoneNo: "",
        assignedBus: { _id: "", busNumber: "" },
      }}
    />
  );
}

export default DriverComponent;
