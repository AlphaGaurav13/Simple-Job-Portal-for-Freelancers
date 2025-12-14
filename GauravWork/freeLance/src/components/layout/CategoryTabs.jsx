import { categories } from "../../data/categories";

export default function CategoryTabs() {
  return (
    <div className="flex gap-3 overflow-x-auto mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full border whitespace-nowrap ${
            cat === "All"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
