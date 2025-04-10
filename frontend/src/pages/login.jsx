import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const navigate = useNavigate();

  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if a token already exists in local storage
      const existingToken = localStorage.getItem("token");
      if (existingToken) {
        // Validate the token with the backend
        const validateResponse = await fetch(
          "http://localhost:5001/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${existingToken}`,
            },
          },
        );

        if (validateResponse.ok) {
          console.log("Token is valid. Logging in without new request.");
          navigate("/resumeupload");
          return;
        } else {
          console.log("Token is invalid. Proceeding with login request.");
        }
      }

      // If no valid token, proceed with login request
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Login failed. Please check your credentials.",
        );
      }

      const { token, userId } = await response.json();
      localStorage.setItem("token", token); // Store token in localStorage
      localStorage.setItem("userId", userId);
      console.log("Login successful");

      // Navigate to the next page
      navigate("/resumeupload");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side: Sign-in Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-12 mb-20">
        <div className="text-center mb-8 ">
          <h2 className="text-4xl font-semibold ">Sign in to GLAFIT</h2>
        </div>

        {/* Social Sign-in Buttons */}
        <div className="flex gap-4 mb-4">
          <button className="bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="bg-red-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
            <i className="fab fa-google"></i>
          </button>
          <button className="bg-black text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
            <i className="fab fa-apple"></i>
          </button>
        </div>

        <p className="text-gray-500 mb-4">or do via email</p>

        {/* Email and Password Input */}
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input type="checkbox" id="remember-me" className="mr-2" />
            <label htmlFor="remember-me" className="text-gray-500">
              Remember me
            </label>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-gray-500 mt-4">
          don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="w-1/2 flex items-center justify-center m-0 p-0">
        <img
          src="src\assets\Jd.png"
          alt="Background"
          className="w-full h-full object-cover m-0"
        />
      </div>
    </div>
  );
};

export default Login;
