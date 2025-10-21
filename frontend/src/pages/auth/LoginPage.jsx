import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,
        { email, password }
      );

      if (response.status === 200 || response.data.success) {
        toast.success("Login successful 🎉");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100/70 text-gray-800 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6 text-center">
          Sign in to your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          <p className="text-sm text-blue-500 hover:text-blue-400 hover:underline mt-3 cursor-pointer text-right font-medium">
            Forgot Password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 flex items-center justify-center bg-blue-500 hover:bg-blue-400 transition-all py-2.5 rounded-lg font-semibold text-white shadow-md hover:shadow-lg ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Spinner size="sm" color="white" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <h2>
            Not Registered?{" "}
            <span className="text-blue-500 hover:text-blue-400 hover:underline cursor-pointer font-medium">
              Create an Account
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
