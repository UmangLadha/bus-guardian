import SubmitButton from "../components/common/button/Button";
import PageHeading from "../components/common/pageHeading/pageheading";
import { FiPlus } from "react-icons/fi";
import DataTable from "../components/common/table/dataTable";

function Bus() {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeading
          heading="Bus Management"
          description="Add, edit, and manage school buses"
        />
        <SubmitButton btnText="Add New Bus">
          <FiPlus />
        </SubmitButton>
      </div>
      <DataTable />
    </>
  );
}
export default Bus;
