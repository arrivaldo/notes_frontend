import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hero from "./components/Hero";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ContextProvider from "./context/ContextProvider";


function App() {
  return (
    <BrowserRouter> {/* Ensures BrowserRouter is the outermost wrapper */}
      <ContextProvider> {/* Wraps entire application */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        </Routes>
        <ToastContainer />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
