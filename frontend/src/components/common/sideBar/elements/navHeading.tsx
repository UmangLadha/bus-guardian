import { TbBus } from "react-icons/tb";
import { Link } from "react-router-dom";

function NavHeading() {
  return (
    <Link
      to="/"
      className="flex items-center justify-center rounded-tr-xl h-20 bg-amber-500 text-white text-2xl font-bold border-b border-amber-400"
    >
      <TbBus className="h-8 w-8 mr-2" />
      Bus Guardian
    </Link>
  );
}

export default NavHeading;
