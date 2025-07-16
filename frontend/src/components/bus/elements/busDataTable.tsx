import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface BusDataTypes {
  _id: string;
  busNumber: string;
  busDriver: string;
  busRoute: string;
  busCapacity: number;
}

interface BusDataTableProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function BusDataTable({ setOpenModal }: BusDataTableProps) {
  const [tableContent, setTableContent] = useState([]);
  // const tableData = [
  //   {
  //     id: "BUS001",
  //     number: "School Bus 1",
  //     driver: "John Smith",
  //     route: "Route A",
  //     status: "Active",
  //     students: 25,
  //   },
  //   {
  //     id: "BUS002",
  //     number: "School Bus 2",
  //     driver: "Sarah Johnson",
  //     route: "Route B",
  //     status: "Active",
  //     students: 30,
  //   },
  //   {
  //     id: "BUS003",
  //     number: "School Bus 3",
  //     driver: "Mike Wilson",
  //     route: "Route C",
  //     status: "Maintenance",
  //     students: 40,
  //   },
  //   {
  //     id: "BUS004",
  //     number: "School Bus 4",
  //     driver: "Emily Davis",
  //     route: "Route D",
  //     status: "Active",
  //     students: 28,
  //   },
  // ];

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getBusData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/bus`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.buses);
        setTableContent(response.data.buses);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("error in fetching data:", error);
          toast.error(error.response?.data.message || "error in fetching data");
        }
      }
    };
    getBusData();
  }, []);

  const actionEdit = () => {
    setOpenModal(true);
  };

  // const actionDelete = (id: string) => {
  //   // const deletedTable = tableContent.filter((item) => item._id !== id);
  //   // setTableContent(deletedTable);
  // };

  return (
    <tbody>
      {tableContent.length > 0 &&
        tableContent?.map((data: BusDataTypes) => (
          <tr
            key={data._id}
            className="border-b border-gray-200 hover:bg-gray-50"
          >
            <td className="py-3 px-4 text-sm font-medium text-gray-900">
              {data.busNumber}
            </td>
            <td className="py-3 px-4 text-sm text-gray-700">
              {data.busDriver}
            </td>
            <td className="py-3 px-4 text-sm text-gray-700">{data.busRoute}</td>
            <td className="py-3 px-4 text-sm text-gray-700">
              {data.busCapacity}
            </td>
            <td className="py-3 px-4 flex gap-4 items-center">
              <FaRegEdit
                title="Update"
                onClick={actionEdit}
                className="text-amber-500 size-5 cursor-pointer"
              />
              <MdDeleteOutline
                title="Delete"
                // onClick={() => actionDelete(data._id)}
                className="text-red-600 size-5 cursor-pointer"
              />
            </td>
          </tr>
        ))}
    </tbody>
  );
}

export default BusDataTable;
