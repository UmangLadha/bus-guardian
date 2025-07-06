import { Outlet } from "react-router-dom";
import SideBar from "../components/common/sideBar/sideBar";

function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
