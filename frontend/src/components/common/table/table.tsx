import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function Table() {
  const buses = [
    {
      id: "BUS001",
      number: "School Bus 1",
      driver: "John Smith",
      route: "Route A",
      status: "Active",
      students: 25,
    },
    {
      id: "BUS002",
      number: "School Bus 2",
      driver: "Sarah Johnson",
      route: "Route B",
      status: "Active",
      students: 30,
    },
    {
      id: "BUS003",
      number: "School Bus 3",
      driver: "Mike Wilson",
      route: "Route C",
      status: "Maintenance",
      students: 0,
    },
    {
      id: "BUS004",
      number: "School Bus 4",
      driver: "Emily Davis",
      route: "Route D",
      status: "Active",
      students: 28,
    },
  ];

  return (
    <div className="my-4">
      <div className="overflow-x-auto overflow-y-auto max-h-[560px] rounded-lg shadow border scroll-smooth border-gray-300">
        <table className="w-full">
          <thead className="bg-amber-100">
            <tr className="border-b border-gray-300">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Bus ID
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Bus Number
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Driver
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Route
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Students
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr
                key={bus.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {bus.id}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {bus.number}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {bus.driver}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{bus.route}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {bus.students}
                </td>
                <td className="py-3 px-4 flex gap-4 items-center">
                  <FaRegEdit
                    title="Update"
                    className="text-amber-500 size-5 cursor-pointer"
                  />
                  <MdDeleteOutline
                    title="Delete"
                    className="text-red-600 size-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Table;
