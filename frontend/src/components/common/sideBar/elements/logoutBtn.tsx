import { MdOutlineLogout } from "react-icons/md";

function LogoutBtn() {
  return (
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
  );
}

export default LogoutBtn;
