import "./App.css";
import AuthPage from "./pages/authPage/auth.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.page";
import RouteNotFoundPage from "./pages/routeNotFoundPage";

function App() {
  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<RouteNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
