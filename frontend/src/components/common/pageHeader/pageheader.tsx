import { FiPlus } from "react-icons/fi";
import Button from "../button/Button";
import type { PageHeaderTypes } from "../../../types/types";

function PageHeader({
  heading,
  description,
  setOpenModal,
  btnText,
}: PageHeaderTypes) {
  return (
    <div className="flex justify-between  items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{heading}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      {setOpenModal && (
        <Button
          btnType="button"
          onClick={() => setOpenModal(true)}
          btnText={btnText || "Add Button Name"}
          className="w-40 bg-secondary flex items-center justify-start gap-3 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer "
        >
          <FiPlus />
        </Button>
      )}
    </div>
  );
}

export default PageHeader;
