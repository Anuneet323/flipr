import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function Landing() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [emailSub, setEmailSub] = useState("");

  useEffect(() => {
    api.get("/projects").then((r) => setProjects(r.data)).catch(() => {});
    api.get("/clients").then((r) => setClients(r.data)).catch(() => {});
  }, []);

  const submitContact = async (e) => {
    e.preventDefault();
    await api.post("/contacts", contact);
    alert("Contact form submitted!");
    setContact({ fullName: "", email: "", mobile: "", city: "" });
  };

  const subscribe = async (e) => {
    e.preventDefault();
    await api.post("/newsletter", { email: emailSub });
    alert("Subscribed successfully!");
    setEmailSub("");
  };

  return (
    <main className="fade-in">

      {/* ------------------------------ */}
      {/* HERO SECTION */}
      {/* ------------------------------ */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        
        {/* Left */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Discover Premium  
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              {" "}Design & Development
            </span>
          </h1>

          <p className="mt-5 text-gray-300 max-w-xl">
            A professionally crafted landing + admin system showcasing
            client management, project display, newsletters & contact form.
            Built with React, TailwindCSS, Express, Cloudinary & MongoDB.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="#projects"
              className="btn-gradient px-6 py-3 rounded-lg shadow text-white font-medium"
            >
              Explore Projects
            </a>
            <a
              href="/admin/login"
              className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
            >
              Admin Panel
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <div className="glass p-6 rounded-2xl shadow-glass">
            <img
              src="https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1000"
              alt="hero"
              className="rounded-xl w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>



      {/* ------------------------------ */}
      {/* PROJECTS SECTION */}
      {/* ------------------------------ */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-8">Our Projects</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p._id}
              className="glass p-4 rounded-xl shadow-glass card-hover"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-48 w-full object-cover rounded-lg"
              />

              <h3 className="mt-4 font-semibold text-xl">{p.name}</h3>
              <p className="text-gray-300 mt-2 line-clamp-3">{p.description}</p>

              <button className="btn-gradient px-4 py-2 mt-4 rounded-lg">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>



      {/* ------------------------------ */}
      {/* HAPPY CLIENTS */}
      {/* ------------------------------ */}
      <section id="clients" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-8">Happy Clients</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {clients.map((c) => (
            <div
              key={c._id}
              className="glass p-6 rounded-xl shadow-glass flex items-start gap-4 card-hover"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-20 h-20 object-cover rounded-full border border-white/20"
              />

              <div>
                <p className="text-gray-300">{c.description}</p>
                <h4 className="font-semibold text-lg mt-3">
                  {c.name}
                </h4>
                <p className="text-sm text-gray-400">{c.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* ------------------------------ */}
      {/* CONTACT FORM */}
      {/* ------------------------------ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>

        <form
          onSubmit={submitContact}
          className="glass p-8 rounded-xl shadow-glass grid gap-4"
        >
          <input
            required
            placeholder="Full Name"
            className="p-3 rounded bg-transparent border border-white/20"
            value={contact.fullName}
            onChange={(e) =>
              setContact({ ...contact, fullName: e.target.value })
            }
          />

          <input
            required
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-transparent border border-white/20"
            value={contact.email}
            onChange={(e) =>
              setContact({ ...contact, email: e.target.value })
            }
          />

          <input
            placeholder="Mobile"
            className="p-3 rounded bg-transparent border border-white/20"
            value={contact.mobile}
            onChange={(e) =>
              setContact({ ...contact, mobile: e.target.value })
            }
          />

          <input
            placeholder="City"
            className="p-3 rounded bg-transparent border border-white/20"
            value={contact.city}
            onChange={(e) =>
              setContact({ ...contact, city: e.target.value })
            }
          />

          <button className="btn-gradient px-6 py-3 rounded-lg text-white mt-3">
            Submit
          </button>
        </form>
      </section>



      {/* ------------------------------ */}
      {/* NEWSLETTER */}
      {/* ------------------------------ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-4">Newsletter</h2>

        <form onSubmit={subscribe} className="flex gap-4">
          <input
            required
            type="email"
            placeholder="Email"
            className="flex-1 p-3 rounded bg-transparent border border-white/20"
            value={emailSub}
            onChange={(e) => setEmailSub(e.target.value)}
          />

          <button className="btn-gradient px-6 py-3 rounded-lg text-white">
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}
