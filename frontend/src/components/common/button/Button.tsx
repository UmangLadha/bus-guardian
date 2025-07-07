import { BiLoaderAlt } from "react-icons/bi";

interface ButtonTypes {
  isLoading?: boolean;
  loadingText?: string;
  btnText?: string;
  children?: React.ReactElement;
}

function Button({
  isLoading,
  loadingText,
  btnText,
  children,
}: ButtonTypes) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`bg-secondary flex items-center justify-center gap-3 mt-5 text-white py-2 px-4 mb-3 max-w-56 min-w-40 w-full rounded-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <>
          <BiLoaderAlt className=" animate-spin w-5 h-5 " />
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
