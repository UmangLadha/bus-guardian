import { useState } from "react";
import PageHeader from "../pageHeader/pageheader";
import Modal from "../model/modal";
import FormHeading from "../model/elements/formHeading";
import Table from "../table/table";
import type { EntityManagerProps } from "../../../types/types";

function EntityManager<T>({
  title,
  description,
  tableHeadings,
  FormComponent,
  DataTableComponent,
  initialData,
  componentName,
}: EntityManagerProps<T>) {
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState<T>(initialData);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <>
      <PageHeader
        heading={title}
        description={description}
        setOpenModal={handleOpenModal}
        btnText={`Add ${componentName}`}
      />

      {openModal && (
        <Modal>
          <FormHeading
            heading={`${componentName} ${
              isEditMode ? "Update" : "Registration"
            } Form`}
            subHeading={
              isEditMode
                ? `Update existing ${componentName.toLocaleLowerCase()} details`
                : `Fill in the details to register a new ${componentName.toLocaleLowerCase()}`
            }
            setOpenModal={handleCloseModal}
          />
          <FormComponent
            selectedData={selectedData}
            isEditMode={isEditMode}
            setOpenModal={handleCloseModal}
          />
        </Modal>
      )}

      <Table tableHeadings={tableHeadings}>
        <DataTableComponent
          setIsEditMode={setIsEditMode}
          setSelectedData={setSelectedData}
          setOpenModal={handleOpenModal}
        />
      </Table>
    </>
  );
}

export default EntityManager;
