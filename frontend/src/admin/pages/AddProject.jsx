import React, { useState } from "react";
import api from "../../api/axiosClient";

export default function AddProject() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    await api.post("/projects", fd);
    alert("Project Added Successfully!");

    setForm({
      name: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Add New Project</h2>

      <form
        onSubmit={submit}
        className="glass p-8 rounded-xl shadow-glass max-w-xl space-y-4"
      >
        {/* Project Name */}
        <div>
          <label className="text-gray-300 text-sm">Project Name</label>
          <input
            required
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            placeholder="Enter project name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="text-gray-300 text-sm">Description</label>
          <textarea
            required
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            placeholder="Enter project description"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-gray-300 text-sm">Project Image</label>
          <input
            type="file"
            className="w-full text-gray-300 mt-2"
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files[0],
              })
            }
          />
        </div>

        {/* Submit Button */}
        <button className="btn-gradient px-6 py-3 rounded-lg text-white text-lg w-full shadow">
          Add Project
        </button>
      </form>
    </div>
  );
}
