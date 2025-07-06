import SignupForm from "../forms/signUpForm";
import LoginForm from "../forms/loginForm";
import FadeTransition from "./fadeTransition";

function AuthSwitcher({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex-col justify-center items-start overflow-hidden">
      {isActive ? (
        <FadeTransition show={isActive}>
          <LoginForm />
        </FadeTransition>
      ) : (
        <FadeTransition show={!isActive}>
          <SignupForm />
        </FadeTransition>
      )}
    </div>
  );
}
export default AuthSwitcher;
