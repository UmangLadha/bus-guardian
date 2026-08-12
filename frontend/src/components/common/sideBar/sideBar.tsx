import LogoutBtn from "./elements/logoutBtn";
import NavHeading from "./elements/navHeading";
import NavLinks from "./elements/navLinks";

function SideBar() {
  return (
    <div className="w-70 bg-white shadow-xl flex flex-col">
      <NavHeading />
      <NavLinks />
      <LogoutBtn />
    </div>
  );
}

export default SideBar;
