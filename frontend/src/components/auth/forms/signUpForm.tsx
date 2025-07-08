import { useState } from "react";
import TextInput from "../../common/formInputs/textInput";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../common/button/Button";

interface AdminCredentials {
  email: string;
  phoneNo: number;
  password: string;
}

function SignupForm() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    contactNo: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { email, contactNo, password } = inputValue;

  const handleInputChange = (field: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setInputValue({ email: "", contactNo: "", password: "" });
  };

  const sendingDataToServer = async (adminCred: AdminCredentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/register`,
        adminCred
      );
      toast.success(response.data.message || "Registration successful!");
      console.log(response);
      localStorage.setItem("token", response.data.token);
      resetForm();
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data.message || "error in creating account!"
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
      phoneNo: Number(contactNo),
      password,
    };

    console.log(adminCred);
    toast.promise(sendingDataToServer(adminCred), {
      loading: "registering the admin...",
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
        placeholder="example@gmail.com"
        onChange={(val) => handleInputChange("email", val)}
        required
      />
      <TextInput
        name="contactNo"
        label="Contact No"
        type="tel"
        value={contactNo}
        maxLength={10}
        minLength={10}
        placeholder="Enter contact number"
        title="Must contain a 10 digit contact number"
        onChange={(val) => handleInputChange("contactNo", val)}
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
        placeholder="Enter password"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more character"
        onChange={(val) => handleInputChange("password", val)}
        required
      />
      <Button
        btnType="submit"
        isLoading={isLoading}
        loadingText="Creating"
        btnText="Create Account"
        className="bg-secondary flex items-center justify-center gap-3 mt-5 text-white py-2 px-4 mb-3 w-full rounded-lg font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </form>
  );
}

export default SignupForm;
