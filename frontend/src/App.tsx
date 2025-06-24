import "./App.css";
import LoginPage from "./pages/login.page";
import SignUpPage from "./pages/signup.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard.page";
import RouteNotFoundPage from "./pages/routeNotFoundPage";

function App() {
  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<RouteNotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
