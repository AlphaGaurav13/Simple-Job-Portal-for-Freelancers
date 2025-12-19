const categories = [
  "All",
  "Logo Design",
  "Branding Services",
  "Social Media Design",
  "Website Design",
  "Illustrations",
  "Packaging Design",
];

export default function CategoryTabs({ selected, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full border
            ${
              selected === cat
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
