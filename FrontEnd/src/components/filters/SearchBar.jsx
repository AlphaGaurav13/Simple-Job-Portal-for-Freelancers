export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search services..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-4 py-2 rounded-md w-full sm:w-72"
    />
  );
}
