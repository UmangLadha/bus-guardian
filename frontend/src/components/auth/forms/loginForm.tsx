import { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../common/button/Button";

interface AdminCred {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = inputValue;

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setInputValue({ email: "", password: "" });
  };

  const sendingDataToServer = async (adminCred: AdminCred) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        adminCred
      );
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      resetForm();
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data.message ||
            "Error in login, please try again later!"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const adminCred = {
      email,
      password,
    };
    toast.promise(sendingDataToServer(adminCred), {
      loading: "loging the admin...",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between mx-auto items-center w-full"
    >
      <TextInput
        name="email"
        label="Email"
        type="email"
        value={email}
        minLength={8}
        placeholder="Enter Email"
        onChange={(val) => handleInputChange("email", val)}
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
        required
      />
      <Button
        btnType="submit"
        isLoading={isLoading}
        loadingText="Loging"
        btnText="Login"
        className="bg-secondary flex items-center justify-center gap-3 mt-5 text-white py-2 px-4 mb-3 w-full rounded-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </form>
  );
}
export default LoginForm;
