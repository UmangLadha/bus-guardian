import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface BusDataTableProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function BusDataTable({ setOpenModal }: BusDataTableProps) {
  const tableData = [
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
      students: 40,
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

  const [tableContent, setTableContent] = useState(tableData);

  const actionEdit = () => {
    setOpenModal(true);
  };

  const actionDelete = (id: string) => {
    const deletedTable = tableContent.filter((item) => item.id !== id);
    setTableContent(deletedTable);
  };

  return (
    <tbody>
      {tableContent.map((data) => (
        <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-50">
          <td className="py-3 px-4 text-sm font-medium text-gray-900">
            {data.id}
          </td>
          <td className="py-3 px-4 text-sm text-gray-700">{data.driver}</td>
          <td className="py-3 px-4 text-sm text-gray-700">{data.route}</td>
          <td className="py-3 px-4 text-sm text-gray-700">{data.students}</td>
          <td className="py-3 px-4 flex gap-4 items-center">
            <FaRegEdit
              title="Update"
              onClick={actionEdit}
              className="text-amber-500 size-5 cursor-pointer"
            />
            <MdDeleteOutline
              title="Delete"
              onClick={() => actionDelete(data.id)}
              className="text-red-600 size-5 cursor-pointer"
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default BusDataTable;
