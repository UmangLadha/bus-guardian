import type { ToggleBtnType } from "../../../types/types";

function AuthToggleBtn({ isActive, setIsActive }: ToggleBtnType) {
  return (
    <div className="w-full p-1 bg-amber-100 flex justify-between gap-1 rounded-md my-3">
      <div
        className={`flex-1 p-1 text-center rounded-md cursor-pointer transition-colors duration-300 ${
          isActive ? "bg-amber-500 text-white font-semibold hover:bg-amber-400" : "text-slate-400 font-semibold"
        }`}
        onClick={() => setIsActive(true)}
      >
        Login
      </div>
      <div
        className={`flex-1 p-1 text-center rounded-md cursor-pointer transition-colors duration-300 ${
          !isActive ? "bg-amber-500 text-white font-semibold hover:bg-amber-400" : "text-slate-400 font-semibold"
        }`}
        onClick={() => setIsActive(false)}
      >
        Sign Up
      </div>
    </div>
  );
}

export default AuthToggleBtn;
