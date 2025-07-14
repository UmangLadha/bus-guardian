import "./App.css";
import AuthPage from "./pages/auth.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.page";
import RouteNotFoundPage from "./routes/routeNotFoundPage";
import PrivateRoutes from "./routes/privateRoutes";
import { Toaster } from "react-hot-toast";
import Bus from "./pages/bus.page";
import Driver from "./pages/driver.page";
import Student from "./pages/student.page";
import Wrapper from "./components/common/wrapper";
import RoutePage from "./pages/route.page";


function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Wrapper />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bus" element={<Bus />} />
              <Route path="driver" element={<Driver />} />
              <Route path="student" element={<Student />} />
              <Route path="route" element={<RoutePage />} />
            </Route>
          </Route>
          <Route path="*" element={<RouteNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
