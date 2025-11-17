import React, { useState } from "react";
import api from "../../api/axiosClient";

export default function AddClient() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
  });

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("designation", form.designation);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    await api.post("/clients", fd);
    alert("Client added successfully!");

    setForm({
      name: "",
      designation: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Add New Client</h2>

      <form
        onSubmit={submit}
        className="glass p-8 rounded-xl shadow-glass max-w-xl space-y-4"
      >
        {/* Client Name */}
        <div>
          <label className="text-gray-300 text-sm">Client Name</label>
          <input
            required
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            placeholder="Enter client name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* Client Designation */}
        <div>
          <label className="text-gray-300 text-sm">Designation</label>
          <input
            required
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            placeholder="e.g. CEO, Web Developer, Designer"
            value={form.designation}
            onChange={(e) =>
              setForm({ ...form, designation: e.target.value })
            }
          />
        </div>

        {/* Client Description */}
        <div>
          <label className="text-gray-300 text-sm">Description</label>
          <textarea
            required
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            placeholder="Enter short client feedback"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Client Image */}
        <div>
          <label className="text-gray-300 text-sm">Client Image</label>
          <input
            type="file"
            required
            className="w-full text-gray-300 mt-2"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />
        </div>

        {/* Submit Button */}
        <button className="btn-gradient px-6 py-3 rounded-lg text-white text-lg w-full shadow">
          Add Client
        </button>
      </form>
    </div>
  );
}
