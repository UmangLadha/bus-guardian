import DriverForm from "./elements/driverForm";
import EntityManager from "../common/entityManager/entityManagr";
import DriverDataTable from "./elements/driverDataTable";

function DriverComponent() {
  return (
    <EntityManager
      componentName="Driver"
      title="Driver Management"
      description="Manage your school buses drivers."
      tableHeadings={[
        "Driver Name",
        "Phone No.",
        "Bus Assigned",
        "Actions",
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
