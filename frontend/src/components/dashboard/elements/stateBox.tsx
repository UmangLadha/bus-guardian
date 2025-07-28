import { BiBus } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { FaRoute } from "react-icons/fa6";

function StateBox() {
  const stats = [
    { name: "Total Buses", value: "12", icon: BiBus, color: "bg-secondary" },
    {
      name: "Total Drivers",
      value: "15",
      icon: FiUserCheck,
      color: "bg-green-500",
    },
    {
      name: "Total Students",
      value: "245",
      icon: LuUsers,
      color: "bg-blue-500",
    },
    {
      name: "Active Route",
      value: "8",
      icon: FaRoute,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="w-full my-4 flex justify-start gap-8 items-center">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="hover:shadow-lg w-full shadow border border-gray-300 rounded-xl transition-shadow duration-200"
        >
          <div className="py-4 px-10">
            <div className="flex items-center">
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StateBox;
