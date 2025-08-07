import RouteForm from "./elements/routeForm";
import RouteDataTable from "./elements/routeDataTable";
import EntityManager from "../common/entityManager/entityManagr";

function RouteComponent() {
  return (
    <EntityManager
      componentName="Route"
      initialData={{ routeName: "", routeList: [] }}
      title="Route Management"
      tableHeadings={["Route Name", "Locations", "Actions"]}
      description="Manage your school bus routes and stops."
      FormComponent={RouteForm}
      DataTableComponent={RouteDataTable}
    />
  );
}

export default RouteComponent;
