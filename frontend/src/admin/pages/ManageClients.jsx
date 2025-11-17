import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { Link } from "react-router-dom";

export default function ManageClients() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const r = await api.get("/clients");
    setItems(r.data);
  };

  const del = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    await api.delete("/clients/" + id);
    load();
  };

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Manage Clients</h2>

      {items.length === 0 && (
        <p className="text-gray-400">No clients added yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((c) => (
          <div
            key={c._id}
            className="glass p-4 rounded-xl shadow-glass card-hover flex flex-col"
          >
            {/* Client Image */}
            <img
              src={c.image}
              alt={c.name}
              className="h-40 w-full object-cover rounded-lg"
            />

            {/* Client Info */}
            <h3 className="mt-4 font-semibold text-xl">{c.name}</h3>
            <p className="text-gray-400 text-sm">{c.designation}</p>

            <p className="text-gray-300 mt-2 line-clamp-3">{c.description}</p>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <Link
                to={`/admin/edit-client/${c._id}`}
                className="px-4 py-2 bg-yellow-500 rounded-lg text-white text-sm hover:bg-yellow-600 transition"
              >
                Edit
              </Link>

              <button
                onClick={() => del(c._id)}
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
