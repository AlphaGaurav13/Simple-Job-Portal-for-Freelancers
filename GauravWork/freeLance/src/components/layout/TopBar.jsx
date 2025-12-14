export default function TopBar() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 className="text-xl font-semibold">Creative Services</h1>

      <div className="flex gap-3">
        <input
          className="border rounded-lg px-4 py-2 w-64"
          placeholder="Search Creatives..."
        />
        <select className="border rounded-lg px-3 py-2">
          <option>Recommended</option>
          <option>Newest</option>
          <option>Lowest Price</option>
        </select>
      </div>
    </div>
  );
}
