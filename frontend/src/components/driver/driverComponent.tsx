import { useState } from "react";
import Modal from "../common/model/modal";
import Table from "../common/table/table";
import PageHeader from "../common/pageHeader/pageheader";
import DriverForm from "./elements/driverForm";
import DriverDataTable from "./elements/driverDataTable";
import type { CreateDriverDto } from "../../types/types";

function DriverComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState<CreateDriverDto>({
    driverName: "",
    driverPhoneNo: "",
    assignedBus: { _id: "", busNumber: "" },
  });
  return (
    <>
      <PageHeader
        heading="Driver Management"
        description="Add, edit, and manage school drivers"
        setOpenModal={setOpenModal}
        btnText= "Add Driver"
      />

      {openModal && (
        <Modal title="Add New Driver" setOpenModal={setOpenModal}>
          <DriverForm
            isEditMode={isEditMode}
            selectedData={selectedData}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <Table
        tableHeadings={[
          "Sno.",
          "Driver Name",
          "Phone No.",
          "Bus Assigned",
          "Action",
        ]}
      >
        <DriverDataTable
          setIsEditMode={setIsEditMode}
          setSelectedData={setSelectedData}
          setOpenModal={setOpenModal}
        />
      </Table>
    </>
  );
}

export default DriverComponent;
