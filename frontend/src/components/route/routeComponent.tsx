import { useState } from "react";
import PageHeader from "../common/pageHeader/pageheader";
import Modal from "../common/model/modal";
import RouteForm from "./elements/routeForm";
import Table from "../common/table/table";
import RouteDataTable from "./elements/routeDataTable";
import type { CreateRouteDto } from "../../types/types";
import FormHeading from "../common/model/elements/formHeading";

function RouteComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState<CreateRouteDto>({
    routeName: "",
    routeList: [],
  });

  return (
    <>
      <PageHeader
        heading="Route"
        description="Welcome back! Here's what's happening with your school buses today."
        setOpenModal={setOpenModal}
        btnText="Add Route"
      />

      {openModal && (
        <Modal>
          <FormHeading
            heading="Add New Route"
            subHeading="Register a new school bus route in the system"
            setOpenModal={setOpenModal}
          />
          <RouteForm
            selectedData={selectedData}
            isEditMode={isEditMode}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <Table tableHeadings={["Route name", "Route List", "Action"]}>
        <RouteDataTable
          setIsEditMode={setIsEditMode}
          setSelectedData={setSelectedData}
          setOpenModal={setOpenModal}
        />
      </Table>
    </>
  );
}

export default RouteComponent;
