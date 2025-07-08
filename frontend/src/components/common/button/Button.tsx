import type { MouseEventHandler } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonTypes {
  isLoading?: boolean;
  loadingText?: string;
  btnText?: string;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: "submit" | "reset" | "button";
  className: string;
}

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
