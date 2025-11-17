import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";

export default function ViewSubscribers() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/newsletter").then((r) => setList(r.data));
  }, []);

  return (
    <div className="fade-in">
      <h2 className="text-3xl font-bold mb-6">Newsletter Subscribers</h2>

      {list.length === 0 && (
        <p className="text-gray-400">No subscribers yet.</p>
      )}

      <div className="space-y-4">
        {list.map((s) => (
          <div
            key={s._id}
            className="glass p-4 rounded-xl shadow-glass"
          >
            <p className="text-lg">{s.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
