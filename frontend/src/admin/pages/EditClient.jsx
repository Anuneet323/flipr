import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { useParams } from "react-router-dom";

export default function EditClient() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
    image: null
  });

  useEffect(() => {
    api.get("/clients").then((r) => {
      const client = r.data.find((c) => c._id === id);
      if (client) {
        setForm({
          name: client.name,
          designation: client.designation,
          description: client.description,
          image: null
        });
      }
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("designation", form.designation);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    await api.put("/clients/" + id, fd);
    alert("Client Updated!");
    window.location.href = "/admin/manage-clients";
  };

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Edit Client</h2>

      <form
        onSubmit={submit}
        className="glass p-8 rounded-xl shadow-glass max-w-xl space-y-4"
      >
        
        {/* Name */}
        <div>
          <label className="text-gray-300 text-sm">Client Name</label>
          <input
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Designation */}
        <div>
          <label className="text-gray-300 text-sm">Designation</label>
          <input
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            value={form.designation}
            onChange={(e) =>
              setForm({ ...form, designation: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-300 text-sm">Description</label>
          <textarea
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-gray-300 text-sm">Upload New Image</label>
          <input
            type="file"
            className="w-full text-gray-300 mt-2"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />
        </div>

        <button className="btn-gradient px-6 py-3 rounded-lg w-full text-white text-lg shadow">
          Update Client
        </button>
      </form>
    </div>
  );
}
