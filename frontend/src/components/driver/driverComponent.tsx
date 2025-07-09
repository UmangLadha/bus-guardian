import { useState } from "react";
import Modal from "../common/model/modal";
import Table from "../common/table/table";
import PageHeader from "../common/pageHeader/pageheader";
import DriverForm from "./elements/driverForm";
import DriverDataTable from "./elements/driverDataTable";

function DriverComponent(){
      const [openModal, setOpenModal] = useState(false);
    
    return(
         <>
      <PageHeader
        heading="Driver Management"
        description="Add, edit, and manage school drivers"
        setOpenModal={setOpenModal}
      />

      {openModal && (
        <Modal title="Add New Driver" setOpenModal={setOpenModal}>
          <DriverForm />
        </Modal>
      )}

      <Table
        tableHeadings={[
          "Driver ID",
          "Driver Name",
          "Driver Number",
          "Bus Number",
          "Action",
        ]}
      >
        <DriverDataTable 
        setOpenModal={setOpenModal}
         />
      </Table>
    </>
    );
}

export default DriverComponent;