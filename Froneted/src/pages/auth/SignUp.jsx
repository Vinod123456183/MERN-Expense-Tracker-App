import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SIGN_UP } from "../../APIS/user-auth-routes-api"; // Make sure SIGN_UP is correct

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the payload to the console to inspect what we're sending
    // console.log("Sending data:", { userName, email, password });

    try {
      const response = await axios.post(
        SIGN_UP,
        { userName, email, password },
        { withCredentials: true } // Include cookies if necessary
      );

      if (response.data.success) {
        setError("");
        navigate("/auth/login"); // Redirect to login page after successful signup
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);

      // Log the error response to see if we have more detailed info
      if (err.response) {
        console.error("Error response data:", err.response.data);
        setError(
          err.response?.data?.message || "Something went wrong. Try again."
        );
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="font-raleway min-h-screen flex items-center justify-center dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Create Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Display error message if any */}
          {error && <p className="text-center text-sm text-red-600">{error}</p>}

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login page */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
