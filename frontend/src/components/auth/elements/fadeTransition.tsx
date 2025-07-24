import type { TransitionTypes } from "../../../types/types";

function FadeTransition({ show, children }: TransitionTypes) {
  return (
    <div
      className={`w-full transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}

export default FadeTransition;
