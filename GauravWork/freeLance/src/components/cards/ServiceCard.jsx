import { motion } from "framer-motion";

export default function ServiceCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        relative overflow-hidden
        rounded-2xl p-6
        bg-white/60 backdrop-blur-xl
        border border-white/40
        shadow-md hover:shadow-xl
      "
    >
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none" />

      <h3 className="text-lg font-semibold mb-1 relative z-10">
        {data.title}
      </h3>

      <p className="text-blue-600 text-sm mb-2 relative z-10">
        {data.price}
      </p>

      <p className="text-gray-700 text-sm mb-4 relative z-10">
        {data.desc}
      </p>

      <div className="flex justify-between text-xs text-gray-600 relative z-10">
        <span>{data.author}</span>
        <span>{data.country}</span>
      </div>
    </motion.div>
  );
}
