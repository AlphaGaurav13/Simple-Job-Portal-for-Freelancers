import { useEffect, useState } from "react";
import ServiceCard from "../components/cards/ServiceCard";

const categories = [
  "All",
  "Logo Design",
  "Branding Services",
  "Social Media Design",
  "Website Design",
  "Illustrations",
  "Packaging Design",
];

export default function FreelancersPage() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch services
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔹 Filter logic
  useEffect(() => {
    let result = services;

    if (category !== "All") {
      result = result.filter((s) => s.category === category);
    }

    if (search) {
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [category, search, services]);

  // 🔹 Loading UI
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading services...
      </p>
    );
  }

  return (
    <div className="className=min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-100">
      
      {/* 🔹 Category + Search row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        
        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full border whitespace-nowrap
                ${
                  category === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 border rounded-md px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🔹 Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <ServiceCard key={service._id} data={service} />
        ))}
      </div>
    </div>
  );
}
