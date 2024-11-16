// frontend/src/pages/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/ContextProvider";
import Navbar3 from "../components/Navbar3";
import Footer from "../components/Footer";
import {toast} from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://notesserver-production-564d.up.railway.app/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate('/home'); // Redirect to home after login
        toast.success("Welcome")
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Not so fast! Try again")

    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar3 />
      <div className="flex-grow flex justify-center items-center">
        <div className="border shadow p-6 w-80 bg-white">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xl text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                className="w-full text-lg px-3 py-2 border"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="w-full text-lg px-3 py-2 border"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full text-xl bg-teal-600 text-white py-2"
              >
                Login
              </button>
              <p className="text-center text-lg mt-4">
                Don&apos;t Have an Account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
