import EntityManager from "../common/entityManager/entityManagr";
import BusDataTable from "./elements/busDataTable";
import BusForm from "./elements/busForm";

function BusComponent() {
  return (
    <EntityManager
      componentName="Bus"
      title="Bus Management"
      description="Add, edit, and manage school buses"
      tableHeadings={[
        "Bus Number",
        "Bus Driver",
        "Route",
        "Bus Capacity",
        "Action",
      ]}
      FormComponent={BusForm}
      DataTableComponent={BusDataTable}
      initialData={{
        busNumber: "",
        busCapacity: "",
        assignedDriver: { _id: "", driverName: "" },
        assignedRoute: { _id: "", busRoute: "" },
      }}
    />
  );
}

export default BusComponent;
