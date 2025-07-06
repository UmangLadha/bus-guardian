import { MdOutlineLogout } from "react-icons/md";
import { TbBus } from "react-icons/tb";
import { BiBus } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";

function SideBar() {
  const SideBarItems = [
    {
      title: "Dashboard",
      route: "/dashboard",
      icon: LuLayoutDashboard,
    },
    {
      title: "Bus Management",
      route: "/bus",
      icon: BiBus,
    },
    {
      title: "Driver Management",
      route: "/driver",
      icon: FiUserCheck,
    },
    {
      title: "Student Management",
      route: "/student",
      icon: LuUsers,
    },
  ];

  return (
    <div className="w-60 bg-white shadow-xl flex flex-col">
      <Link
        to="/"
        className="flex items-center justify-center h-20 bg-amber-500 text-white text-2xl font-bold border-b border-amber-400"
      >
        <TbBus className="h-8 w-8 mr-2" />
        Bus Guardian
      </Link>

      <nav className="flex-1 py-3 px-3">
        <ul className="space-y-2">
          {SideBarItems.map((item) => (
            <li key={item.route}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 p-3 text-amber-100 bg-amber-500 rounded-lg font-semibold transition-colors duration-200"
                    : "flex items-center gap-3 p-3 text-black hover:text-amber-600 hover:bg-amber-100 rounded-lg transition-colors duration-200"
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-2 border-t border-amber-400">
        <button
          className="w-full flex items-center cursor-pointer gap-3 p-3 text-red-600 hover:bg-amber-100 rounded-lg font-semibold transition-colors duration-200"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/auth";
          }}
        >
          <MdOutlineLogout className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
