import { useState } from "react";
import PageHeader from "../common/pageHeader/pageheader";
import Modal from "../common/model/modal";
import RouteForm from "./elements/routeForm";

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
          title="Add New Bus"
          subTitle="Register a new school bus in the system"
          setOpenModal={setOpenModal}
        >
          <RouteForm setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
}

export default RouteComponent;
