import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-zinc-100 px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-center mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="py-2 px-4 rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50 transition duration-200"
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
