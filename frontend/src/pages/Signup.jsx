import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { username, email, password } = data;

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/signup", // Make sure this endpoint exists and accepts POST
        data
      );
      console.log("Signup successful:", response.data);
      alert("Signup successful!");
      // Optional: Redirect or clear form
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center bg-gray-900">
      <div className="p-6 w-2/6 rounded bg-gray-800 shadow-lg">
        <div className="text-2xl font-semibold text-white mb-4">Sign Up</div>
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <div className="flex items-center justify-between mt-4">
          <button
            className="bg-blue-400 hover:bg-blue-500 text-xl font-semibold text-black px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <Link to="/login" className="text-gray-300 hover:text-white text-sm">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
