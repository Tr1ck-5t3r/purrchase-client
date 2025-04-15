import { Link } from "react-router-dom";


function onSubmission(e) {
  e.preventDefault();
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  fetch(`http://localhost:5000/register`, {
    // Fix: Correct env variable usage
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Registration successful!");
        window.location.href = "/login"; // Fix: Redirect only after success
      } else {
        console.error("Registration failed.", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  e.target.reset();
}

function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-900 via-[#0d0d0d] to-zinc-900 text-white">
      <div className="w-1/2 backdrop-blur-md bg-slate-400 rounded-3xl bg-opacity-10 px-8 py-12">
        <h1 className="text-4xl font-bold text-center mt-10">Register</h1>
        <p className="text-center mt-5">Create a new account.</p>

        {/* Fix: Added onSubmit to the form */}
        <form
          className="text-black flex flex-col items-center mt-10"
          onSubmit={onSubmission}
        >
          {/* Fix: Added name attributes */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-gray-300 rounded-md p-2 mb-4 w-3/5"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 mb-4 w-3/5"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 mb-4 w-3/5"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border border-gray-300 rounded-md p-2 mb-4 w-3/5"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-md p-2 mb-4 w-3/5"
          />
          <button
            type="submit"
            className="rounded-lg bg-white text-orange-500 shadow-sm hover:text-pink-500 hover:bg-gray-50 p-2 w-1/3"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
