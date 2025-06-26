import { TbBus } from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import { LuSchool } from "react-icons/lu";

function AuthHeading() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full md:mb-1 shadow-lg">
          <TbBus className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Bus Guardian</h1>
      </div>

      <h2 className="text-4xl font-bold text-center sm:text-left text-slate-800">
        Safe journeys for every student
      </h2>

      <p className="md:flex text-lg sm:text-slate-600 hidden">
        Track school buses in real-time, view routes, and stay informed about
        your child's journey to and from school.
      </p>

      <div className="md:flex gap-4 flex-wrap hidden">
        <div className="flex items-center gap-2 bg-sky-100 p-3 rounded-lg">
          <LuSchool className="h-5 w-5 text-sky-700" />
          <span className="text-sky-700 font-medium">Real-time tracking</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-100 p-3 rounded-lg">
          <LuUserRound className="h-5 w-5 text-blue-700" />
          <span className="text-blue-700 font-medium">Driver details</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-100 p-3 rounded-lg">
          <TbBus className="h-6 w-6 text-amber-700" />
          <span className="text-amber-700 font-medium">
            Route visualization
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthHeading;
