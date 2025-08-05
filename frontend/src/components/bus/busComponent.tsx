import { useState } from "react";
import Modal from "../common/model/modal";
import Table from "../common/table/table";
import BusForm from "./elements/busForm";
import PageHeader from "../common/pageHeader/pageheader";
import BusDataTable from "./elements/busDataTable";
import type { CreateBusDto } from "../../types/types";
import FormHeading from "../common/model/elements/formHeading";

function BusComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState<CreateBusDto>({
    busNumber: "",
    busCapacity: 0,
    assignedDriver: { _id: "", driverName: "" },
    assignedRoute: { _id: "", busRoute: "" },
  });

  return (
    <>
      <PageHeader
        heading="Bus Management"
        description="Add, edit, and manage school buses"
        setOpenModal={setOpenModal}
        btnText="Add Bus"
      />

      {openModal && (
        <Modal>
          <FormHeading
            heading={isEditMode ? "Update Bus" : "Add New Bus"}
            subHeading={
              isEditMode
                ? "Update existing bus details"
                : "Register a new school bus"
            }
            setOpenModal={setOpenModal}
          />
          <BusForm
            selectedData={selectedData}
            isEditMode={isEditMode}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <Table
        tableHeadings={[
          "Bus Number",
          "Bus Driver",
          "Route",
          "Bus Capacity",
          "Action",
        ]}
      >
        <BusDataTable
          setIsEditMode={setIsEditMode}
          setSelectedData={setSelectedData}
          setOpenModal={setOpenModal}
        />
      </Table>
    </>
  );
}

export default BusComponent;
