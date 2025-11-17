import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminApp from "./admin/AdminApp.jsx";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen text-white">

      {/* NAVBAR only for public routes */}
      {!hideNavbar && (
        <header className="py-6 px-6 bg-transparent">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 
                flex items-center justify-center text-white shadow-lg">
                F
              </div>
              Flipr
            </Link>

            <nav className="space-x-6 hidden md:flex">
              <a href="/" className="text-gray-200 hover:text-white transition">Home</a>
              <a href="/#projects" className="text-gray-200 hover:text-white transition">Projects</a>
              <a href="/#clients" className="text-gray-200 hover:text-white transition">Clients</a>
              <Link 
                to="/admin/login" 
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 
                rounded shadow hover:scale-105 transform transition">
                Admin
              </Link>
            </nav>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
