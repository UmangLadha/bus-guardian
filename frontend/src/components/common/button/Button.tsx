import { BiLoaderAlt } from "react-icons/bi";
import type { ButtonTypes } from "../../../types/types";

function Button({
  isLoading,
  loadingText,
  btnText,
  children,
  onClick,
  btnType,
  className,
}: ButtonTypes) {
  return (
    <button
      type={btnType}
      onClick={onClick}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <BiLoaderAlt className="animate-spin w-5 h-5" />
          {loadingText}
        </>
      ) : (
        <>
          {children}
          {btnText}
        </>
      )}
    </button>
  );
}

export default Button;
