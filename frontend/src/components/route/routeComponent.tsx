import { useState } from "react";
import PageHeader from "../common/pageHeader/pageheader";
import Modal from "../common/model/modal";
import RouteForm from "./elements/routeForm";
import Table from "../common/table/table";
import RouteDataTable from "./elements/routeDataTable";

function RouteComponent() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <PageHeader
        heading="Route"
        description="Welcome back! Here's what's happening with your school buses today."
        setOpenModal={setOpenModal}
      />

      {openModal && (
        <Modal
          title="Add New Route"
          subTitle="Register a new school bus route in the system"
          setOpenModal={setOpenModal}
        >
          <RouteForm setOpenModal={setOpenModal} />
        </Modal>
      )}

      <Table tableHeadings={["Route name", "Route List", "Action"]}>
        <RouteDataTable setOpenModal={setOpenModal} />
      </Table>
    </>
  );
}

export default RouteComponent;
