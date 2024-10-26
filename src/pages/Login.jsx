import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/ContextProvider";
import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {login} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { name, email, password }
      );
      if(response.data.success) {
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        navigate('/')
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar2 />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label className="block text-xl text-gray-700" htmlFor="name">
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
            <label className="block text-xl text-gray-700" htmlFor="name">
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
              Don&apos;t Have Account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>

    </>
  );
};

export default Login;
