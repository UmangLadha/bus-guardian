import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface DriverDataTableProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function DriverDataTable({ setOpenModal }: DriverDataTableProps) {
  const tableData = [
    {
      id: "DRV001",
      name: "John Smith",
      number: "9954373797",
      bus: "BUS001",
    },
    {
      id: "DRV002",
      name: "Sarah Johnson",
      number: "9954373797",
      bus: "BUS001",
    },
    {
      id: "DRV003",
      name: "Mike Wilson",
      number: "9954373797",
      bus: "BUS001",
    },
    {
      id: "DRV004",
      name: "Emily Davis",
      number: "9954373797",
      bus: "BUS001",
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
          <td className="py-3 px-4 text-sm text-gray-700">{data.name}</td>
          <td className="py-3 px-4 text-sm text-gray-700">{data.number}</td>
          <td className="py-3 px-4 text-sm text-gray-700">{data.bus}</td>
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

export default DriverDataTable;
