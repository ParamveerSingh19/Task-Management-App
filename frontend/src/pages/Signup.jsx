import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/dashboard");
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Sign Up</div>
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 px-3 py-2 my-3 w-full"
          name="Username"
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-700 px-3 py-2 my-3 w-full"
          name="email"
          required
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
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
