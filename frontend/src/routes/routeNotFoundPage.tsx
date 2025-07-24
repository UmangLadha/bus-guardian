import { Link } from "react-router-dom";

function RouteNotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center pt-20 gap-2">
      <h1>404</h1>
      <p>Route Not Found</p>
      <Link to="/">
        <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg">
          Go Back
        </button>
      </Link>
    </div>
  );
}

export default RouteNotFoundPage;
