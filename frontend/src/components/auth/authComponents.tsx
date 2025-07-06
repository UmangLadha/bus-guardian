import AuthFormComponent from "../auth/elements/authFormComponent";
import IntroHeadings from "./elements/IntroHeadings";

function AuthComponents() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 items-center md:gap-8">
        <IntroHeadings />
        <AuthFormComponent />
      </div>
    </main>
  );
}
export default AuthComponents;
