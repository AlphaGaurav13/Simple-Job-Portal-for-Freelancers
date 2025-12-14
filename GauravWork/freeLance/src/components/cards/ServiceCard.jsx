export default function ServiceCard({ data }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-lg">{data.title}</h3>
      <p className="text-blue-600 text-sm">{data.price}</p>
      <p className="text-gray-600 text-sm mt-2">{data.desc}</p>

      <div className="text-xs text-gray-500 mt-3 flex justify-between">
        <span>{data.author}</span>
        <span>{data.country}</span>
        <span>{data.category}</span>
      </div>
    </div>
  );
}
