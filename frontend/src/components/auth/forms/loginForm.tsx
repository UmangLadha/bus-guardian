import { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../common/button/submitButton";

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
      console.log("error in sending adminCred: ", error);
      toast.error("Error in login, please try again later!");
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
      className="flex flex-col justify-between mx-auto items-start w-full"
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
            <SubmitButton isLoading={isLoading} loadingText = "Loging"/>

    </form>
  );
}
export default LoginForm;
