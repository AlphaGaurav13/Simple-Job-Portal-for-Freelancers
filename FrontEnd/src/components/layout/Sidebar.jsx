export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r p-4 hidden md:block">
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold mb-6">
        + New Job
      </button>

      <div className="space-y-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Type</h3>
          <button className="w-full border rounded-lg py-2 mb-2">
            Freelancers
          </button>
          <button className="w-full border rounded-lg py-2 text-blue-600 border-blue-600">
            Services
          </button>
        </div>
      </div>
    </aside>
  );
}
