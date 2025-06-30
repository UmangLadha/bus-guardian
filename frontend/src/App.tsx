import "./App.css";
import AuthPage from "./pages/authPage/auth.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.page";
import RouteNotFoundPage from "./routes/routeNotFoundPage";
import PrivateRoutes from "./routes/privateRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<RouteNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
