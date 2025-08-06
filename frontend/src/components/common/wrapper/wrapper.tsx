import { Outlet } from "react-router-dom";
import SideBar from "../sideBar/sideBar";

function Home() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 p-5 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
