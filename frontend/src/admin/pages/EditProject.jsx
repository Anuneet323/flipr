import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { useParams } from "react-router-dom";

export default function EditProject() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null
  });

  useEffect(() => {
    api.get("/projects")
      .then((r) => {
        const project = r.data.find((p) => p._id === id);
        if (project) {
          setForm({
            name: project.name,
            description: project.description,
            image: null
          });
        }
      })
      .catch(() => {});
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    if (form.image) fd.append("image", form.image);

    await api.put("/projects/" + id, fd);
    alert("Project Updated!");
    window.location.href = "/admin/manage-projects";
  };

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Edit Project</h2>

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
            value={form.name}
            placeholder="Enter project name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="text-gray-300 text-sm">Description</label>
          <textarea
            required
            className="w-full p-3 bg-transparent border border-white/20 rounded mt-1"
            rows={4}
            placeholder="Enter project description"
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

        {/* Update Button */}
        <button className="btn-gradient px-6 py-3 rounded-lg w-full text-white text-lg shadow">
          Update Project
        </button>
      </form>
    </div>
  );
}
