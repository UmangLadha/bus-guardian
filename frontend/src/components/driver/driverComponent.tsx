import { useState } from "react";
import Modal from "../common/model/modal";
import Table from "../common/table/table";
import PageHeader from "../common/pageHeader/pageheader";
import DriverForm from "./elements/driverForm";
import DriverDataTable from "./elements/driverDataTable";
import type { CreateDriverDto } from "../../types/types";
import FormHeading from "../common/model/elements/formHeading";

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
        description="Track all students using bus services"
        setOpenModal={setOpenModal}
        btnText="Add Driver"
      />

      {openModal && (
        <Modal>
          <FormHeading
            heading={`Driver ${isEditMode ? "Updation" : "Registration"} Form`}
            subHeading={
              isEditMode
                ? "Update existing bus details"
                : "Fill in the driver details for bus assignment and management"
            }
            setOpenModal={setOpenModal}
          />
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
