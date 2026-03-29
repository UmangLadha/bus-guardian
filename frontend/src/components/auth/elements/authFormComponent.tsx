import AuthToggleBtn from "./authToggleBtn";
import { useState } from "react";
import AuthSwitcher from "./authSwitcher";

function AuthFormComponent() {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="shadow-2xl text-center rounded-xl p-2 bg-white backdrop-blur sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-2/5">
      <div className="text-center p-4">
        <h1 className="text-black font-semibold text-2xl tracking-tight">
          Admin Portal
        </h1>
        <p className="text-slate-400">Sign in or create your admin account</p>
      </div>
      <AuthToggleBtn isActive={isActive} setIsActive={setIsActive} />
      <AuthSwitcher isActive={isActive} />
    </div>
  );
}

export default AuthFormComponent;
