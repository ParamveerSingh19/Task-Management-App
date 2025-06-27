import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Login</div>
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 px-3 py-2 my-3 w-full"
          name="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 px-3 py-2 my-3 w-full"
          name="password"
        />
        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            Not having an account? Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
