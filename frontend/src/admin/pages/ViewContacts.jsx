import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";

export default function ViewContacts() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/contacts").then((r) => setList(r.data));
  }, []);

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Contact Form Responses</h2>

      {list.length === 0 && (
        <p className="text-gray-400">No contact submissions yet.</p>
      )}

      <div className="space-y-4">
        {list.map((c) => (
          <div
            key={c._id}
            className="glass p-6 rounded-xl shadow-glass flex flex-col gap-2"
          >
            <p><strong>Name:</strong> {c.fullName}</p>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Mobile:</strong> {c.mobile}</p>
            <p><strong>City:</strong> {c.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
