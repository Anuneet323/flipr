import React, { useState } from "react";
import api from "../api/axiosClient";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { password });
      localStorage.setItem("admin_token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      alert("Login failed. Check your password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 fade-in">
      <div className="glass p-10 rounded-2xl shadow-glass w-full max-w-md text-white">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold">Admin Login</h3>
          <p className="mt-1 text-gray-300 text-sm">Enter your admin password to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="Admin Password"
            className="w-full p-3 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn-gradient w-full py-3 rounded-lg text-white text-lg font-medium shadow"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Protected Admin Area — Creative Studio Project
          </p>
        </div>
        
      </div>
    </div>
  );
}
