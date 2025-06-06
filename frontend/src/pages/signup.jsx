import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to terms and conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }
      const { token, userId } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      alert("Signup successful!");
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error("Error during signup:", err);
      setError(err.message); // Display backend error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side: Sign-up Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-12 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold">Sign up to GLAFIT</h2>
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
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-gray-500">
              Read and agree to the terms and conditions
            </label>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>

      {/* Right Side: Image */}
      <div className="w-1/2 flex items-center justify-center m-0 p-0">
        <img
          src="src\assets\subject.png"
          alt="Background"
          className="w-full h-full object-cover m-0"
        />
      </div>
    </div>
  );
};

export default SignupPage;
