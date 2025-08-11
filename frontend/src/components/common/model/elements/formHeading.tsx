import { HiOutlineX } from "react-icons/hi";
import type { ModalFormHeadingPropTypes } from "../../../../types/types";

function FormHeading({
  heading,
  subHeading,
  setOpenModal,
}: ModalFormHeadingPropTypes) {
  return (
    <div className="flex justify-between items-start mb-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
        <p className=" text-gray-500">{subHeading}</p>
      </div>
      <div className="hover:bg-gray-200 p-2 rounded-full duration-200">
        <HiOutlineX
          className="size-6 cursor-pointer"
          onClick={() => setOpenModal(false)}
        />
      </div>
    </div>
  );
}

export default FormHeading;
