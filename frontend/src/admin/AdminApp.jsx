import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import AddProject from "./pages/AddProject.jsx";
import AddClient from "./pages/AddClient.jsx";
import ManageProjects from "./pages/ManageProjects.jsx";
import ManageClients from "./pages/ManageClients.jsx";
import ViewContacts from "./pages/ViewContacts.jsx";
import ViewSubscribers from "./pages/ViewSubscribers.jsx";
import EditProject from "./pages/EditProject.jsx";
import EditClient from "./pages/EditClient.jsx";

function requireAuth(component) {
  return localStorage.getItem("admin_token")
    ? component
    : <Navigate to="/admin/login" />;
}

export default function AdminApp() {
  return (
    <div className="min-h-screen flex text-white fade-in">

      {/* ------------------------------ */}
      {/* SIDEBAR */}
      {/* ------------------------------ */}
      <aside className="w-72 p-6 glass shadow-glass hidden md:flex flex-col justify-between">

        {/* Top Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 
              flex items-center justify-center text-white text-xl font-bold shadow-lg">
              A
            </div>
            <div>
              <h3 className="font-bold text-lg">Admin Panel</h3>
              <p className="text-gray-400 text-sm">Creative Studio System</p>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="space-y-2">
            <Link to="add-project" className="block p-2 rounded hover:bg-white/10 transition">
              ➕ Add Project
            </Link>

            <Link to="manage-projects" className="block p-2 rounded hover:bg-white/10 transition">
              📂 Manage Projects
            </Link>

            <Link to="add-client" className="block p-2 rounded hover:bg-white/10 transition">
              😊 Add Client
            </Link>

            <Link to="manage-clients" className="block p-2 rounded hover:bg-white/10 transition">
              🧾 Manage Clients
            </Link>

            <Link to="view-contacts" className="block p-2 rounded hover:bg-white/10 transition">
              📞 Contact Forms
            </Link>

            <Link to="view-subscribers" className="block p-2 rounded hover:bg-white/10 transition">
              ✉ Newsletter
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          className="mt-6 w-full py-2 bg-red-600 rounded-lg hover:bg-red-700 transition shadow"
          onClick={() => {
            localStorage.removeItem("admin_token");
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </aside>

      {/* ------------------------------ */}
      {/* MAIN CONTENT AREA */}
      {/* ------------------------------ */}
      <main className="flex-1 p-8">
        <Routes>
          <Route path="add-project" element={requireAuth(<AddProject />)} />
          <Route path="manage-projects" element={requireAuth(<ManageProjects />)} />
          <Route path="add-client" element={requireAuth(<AddClient />)} />
          <Route path="manage-clients" element={requireAuth(<ManageClients />)} />
          <Route path="view-contacts" element={requireAuth(<ViewContacts />)} />
          <Route path="view-subscribers" element={requireAuth(<ViewSubscribers />)} />
          <Route path="edit-project/:id" element={requireAuth(<EditProject />)} />
          <Route path="edit-client/:id" element={requireAuth(<EditClient />)} />
        </Routes>
      </main>
    </div>
  );
}
