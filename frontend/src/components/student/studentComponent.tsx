import { useState } from "react";
import Modal from "../common/model/modal";
import Table from "../common/table/table";
import PageHeader from "../common/pageHeader/pageheader";
import StudentForm from "./elements/studentForm";
import StudentDataTable from "./elements/studentDataTable";

function StudentComponent(){
      const [openModal, setOpenModal] = useState(false);
    
    return(
         <>
      <PageHeader
        heading="Student Management"
        description="Add, edit, and manage school students"
        setOpenModal={setOpenModal}
      />

      {openModal && (
        <Modal title="Add New Student" setOpenModal={setOpenModal}>
          <StudentForm />
        </Modal>
      )}

      <Table
        tableHeadings={[
          "Student ID",
          "Student Name",
          "Parent Number",
          "Pickup Point",
          "Bus Number",
          "Action"
        ]}
      >
        <StudentDataTable 
        setOpenModal={setOpenModal}
         />
      </Table>
    </>
    );
}

export default StudentComponent;