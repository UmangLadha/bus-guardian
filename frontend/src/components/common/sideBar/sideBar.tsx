import LogoutBtn from "./elements/logoutBtn";
import NavHeading from "./elements/navHeading";
import NavLinks from "./elements/navLinks";

function SideBar() {
  return (
    <div className="w-60 bg-white shadow-xl flex flex-col rounded-tr-xl rounded-br-xl">
      <NavHeading />
      <NavLinks />
      <LogoutBtn />
    </div>
  );
}

export default SideBar;
