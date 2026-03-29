import type { ModalFormButtonPropsTypes } from "../../../../types/types";
import Button from "../../button/Button";

function FormButton({
  setOpenModal,
  isEditMode,
  isLoading,
}: ModalFormButtonPropsTypes) {
  return (
    <div className="flex items-center justify-center mx-auto gap-4 mt-5">
      <Button
        className="w-32 font-semibold bg-gray-400 text-white py-2 px-5 rounded-lg hover:bg-gray-500"
        btnText="Cancel"
        btnType="reset"
        onClick={() => setOpenModal(false)}
      />
      <Button
        btnType="submit"
        btnText={isEditMode ? "Update" : "Submit"}
        isLoading={isLoading}
        loadingText={isEditMode ? "Updating.." : "Submitting..."}
        className="w-32 bg-secondary flex items-center justify-center gap-3 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}

export default FormButton;
