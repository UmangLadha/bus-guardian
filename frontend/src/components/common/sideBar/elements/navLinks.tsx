import { BiBus } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";

function NavLinks() {
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
  );
}

export default NavLinks;
