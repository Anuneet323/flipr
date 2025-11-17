import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { Link } from "react-router-dom";

export default function ManageProjects() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const r = await api.get("/projects");
    setItems(r.data);
  };

  const del = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await api.delete("/projects/" + id);
    load();
  };

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Manage Projects</h2>

      {items.length === 0 && (
        <p className="text-gray-400">No projects added yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((p) => (
          <div
            key={p._id}
            className="glass p-4 rounded-xl shadow-glass card-hover"
          >
            {/* Image */}
            <img
              src={p.image}
              alt={p.name}
              className="h-40 w-full object-cover rounded-lg"
            />

            {/* Title */}
            <h3 className="mt-4 font-semibold text-xl">{p.name}</h3>

            {/* Actions */}
            <div className="mt-4 flex gap-3">
              <Link
                to={`/admin/edit-project/${p._id}`}
                className="px-4 py-2 bg-yellow-500 rounded-lg text-white text-sm hover:bg-yellow-600 transition"
              >
                Edit
              </Link>

              <button
                onClick={() => del(p._id)}
                className="px-4 py-2 bg-red-600 rounded-lg text-white text-sm hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
