import AuthFormComponent from "./elements/authFormComponent";
import AuthHeading from "./elements/authHeadings";

function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 items-center md:gap-8">
        <AuthHeading />
        <AuthFormComponent />
      </div>
    </main>
  );
}

export default AuthPage;
