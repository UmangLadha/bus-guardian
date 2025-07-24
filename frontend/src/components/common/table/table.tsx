import type { TablePropsTypes } from "../../../types/types";

function Table({ tableHeadings, children }: TablePropsTypes) {
  return (
    <div className="mt-8">
      <div className="overflow-x-auto overflow-y-auto h-[580px] rounded-lg shadow border scroll-smooth border-gray-300">
        <table className="w-full">
          <thead className="bg-amber-100 ">
            <tr className="border-b border-gray-300">
              {tableHeadings?.map((headings) => (
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  {headings}
                </th>
              ))}
            </tr>
          </thead>
          {children}
        </table>
      </div>
    </div>
  );
}
export default Table;
