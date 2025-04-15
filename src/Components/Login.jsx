import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "../Redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // Redirect on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors on mount/unmount
  useEffect(() => {
    dispatch(clearAuthError());
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((res) => {
        console.log("Login successful:", res);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="w-full max-w-md backdrop-blur-md bg-slate-400 rounded-3xl bg-opacity-10 px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
        <p className="text-center text-gray-300 mb-8">
          Welcome back! Please login to your account.
        </p>

        {error && (
          <p className="bg-red-800 border border-red-600 text-red-100 px-4 py-2 rounded-md text-center mb-6">
            Error: {error}
          </p>
        )}

        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black border border-gray-300 rounded-md p-3 mb-4 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black border border-gray-300 rounded-md p-3 mb-5 w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 w-1/2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Dont have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
