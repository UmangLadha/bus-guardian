import { useState } from "react";
import TextInput from "../../../components/common/formInputs/textInput";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface AdminCred {
  adminId: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    adminId: "",
    password: "",
  });
  const { adminId, password } = inputValue;
  const [inputValid, setInputValid] = useState({
    adminId: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [field]: value }));
  };

  const fieldValid = (field: string, valid: boolean) => {
    setInputValid((prev) => ({ ...prev, [field]: valid }));
  };

  const resetForm = () => {
    setInputValue({ adminId: "", password: "" });
    setInputValid({ adminId: false, password: false });
  };

  const sendingDataToServer = async (adminCred: AdminCred) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        adminCred
      );
      toast.success(response.data.message || "Login successful!");
      localStorage.setItem("token", response.data.accessToken);
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error in sending adminCred: ", error);
        toast.error(
          error.response?.data?.message || "Admin Registration failed"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formNotValid = !inputValid.adminId || !inputValid.password;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formNotValid) {
      alert("All fields are required");
      return;
    }
    const adminCred = {
      adminId,
      password,
    };
    sendingDataToServer(adminCred);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between mx-auto items-start w-full"
    >
      <TextInput
        name="adminId"
        label="Admin ID"
        type="text"
        value={adminId}
        minLength={8}
        placeholder="Enter admin ID"
        onChange={(val) => handleInputChange("adminId", val)}
        setInputValid={(isvalid) => fieldValid("adminId", isvalid)}
        required
      />
      <TextInput
        name="password"
        label="Password"
        type="password"
        minLength={8}
        value={password}
        autoComplete="on"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more character"
        placeholder="Enter password"
        onChange={(val) => handleInputChange("password", val)}
        setInputValid={(isvalid) => fieldValid("password", isvalid)}
        required
      />
      <button
        type="submit"
        disabled={formNotValid}
        className={`bg-secondary mt-5 text-white py-2 px-4 mb-3 w-full rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? "Loging.." : "Login"}
      </button>
    </form>
  );
}
export default LoginForm;
