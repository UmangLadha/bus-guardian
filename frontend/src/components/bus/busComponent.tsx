import { useState } from "react";
import Modal from "../common/model/modal";
import Table from "../common/table/table";
import BusForm from "./elements/busForm";
import PageHeader from "../common/pageHeader/pageheader";
import BusDataTable from "./elements/busDataTable";

function BusComponent() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <PageHeader
        heading="Bus Management"
        description="Add, edit, and manage school buses"
        setOpenModal={setOpenModal}
      />

      {openModal && (
        <Modal
          title="Add New Bus"
          subTitle="Register a new school bus in the system"
          setOpenModal={setOpenModal}
        >
          <BusForm setOpenModal={setOpenModal} />
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
        <BusDataTable setOpenModal={setOpenModal} />
      </Table>
    </>
  );
}

export default BusComponent;
