import { FiLoader } from "react-icons/fi";
import { MdError } from "react-icons/md";

interface TableStateProps {
  isLoading: boolean;
  isError: boolean;
  colSpan: number;
  loadingMessage?: string;
  errorMessage?: string;
  showSpinner?: boolean;
  children?: React.ReactNode;
}

function TableState({
  isLoading,
  isError,
  colSpan,
  loadingMessage = "Loading...",
  errorMessage = "Error fetching data.",
  showSpinner = true,
  children,
}: TableStateProps) {
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={colSpan} className="text-center py-8">
            <div className="flex items-center justify-center gap-2">
              {showSpinner && <FiLoader className="animate-spin size-5" />}
              <span className="text-gray-600">{loadingMessage}</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (isError) {
    return (
      <tbody>
        <tr>
          <td colSpan={colSpan} className="text-center py-8">
            <div className="flex items-center justify-center gap-2">
              <MdError className="size-5 text-red-500" />
              <span className="text-red-500">{errorMessage}</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return <>{children}</>;
}

export default TableState;
