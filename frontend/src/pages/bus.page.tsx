import Button from "../components/common/button/Button";
import PageHeading from "../components/common/pageHeading/pageheading";
import { FiPlus } from "react-icons/fi";
import Table from "../components/common/table/table";
import { useState } from "react";
import Modal from "../components/common/model/modal";
import BusForm from "../components/bus/elements/busForm";

function Bus() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex justify-between  items-center">
        <PageHeading
          heading="Bus Management"
          description="Add, edit, and manage school buses"
        />
        <Button
          btnType="button"
          onClick={() => setOpenModal(true)}
          btnText="Add Bus"
          className="w-32 bg-secondary flex items-center justify-start gap-3 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer "
        >
          <FiPlus />
        </Button>
      </div>
      {openModal && (
        <Modal title="Add New Bus" setOpenModal={setOpenModal}>
          <BusForm />
        </Modal>
      )}
      <Table />
    </>
  );
}
export default Bus;
