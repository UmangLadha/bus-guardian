import StudentForm from "./elements/studentForm";
import StudentDataTable from "./elements/studentDataTable";
import EntityManager from "../common/entityManager/entityManagr";

function StudentComponent() {

  return (
    <EntityManager
      componentName="Student"
      title="Student Management"
      description="Manage your school students."
      FormComponent={StudentForm}
      DataTableComponent={StudentDataTable}
      initialData={{
        studentId: "",
        studentName: "",
        parentPhoneNo: "",
        assignedBus: { _id: "", busNumber: "" },
       assignedRoute: { _id: "", busRoute: "" },
       pickupPoint:"",
       pickupLocation:""
      }}
      tableHeadings={[
        "Student ID",
        "Student Name",
        "Parent Number",
        "Pickup Point",
        "Bus Number",
        "Actions",
      ]}
    />
  );
}

export default StudentComponent;
