export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-600">FreeLanceHub</h1>
        <div className="space-x-6 text-gray-700 font-medium">
          <a href="#services" className="hover:text-indigo-600">Services</a>
          <a href="#about" className="hover:text-indigo-600">About</a>
          <a href="#contact" className="hover:text-indigo-600">Contact</a>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Login</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-24 text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <h2 className="text-4xl font-bold mb-4">Hire the Best Freelancers For Your Work</h2>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Get your projects done professionally. Connect with skilled freelancers for web development, design, writing, marketing and more.
        </p>
        <button className="px-6 py-3 bg-white text-indigo-600 text-lg font-medium rounded-lg shadow hover:bg-gray-100">
          Get Started
        </button>
      </section>

      {/* Categories Section */}
      <section id="services" className="px-8 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Categories</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Web Development", icon: "💻" },
            { title: "Graphic Designing", icon: "🎨" },
            { title: "Content Writing", icon: "✍️" },
            { title: "Digital Marketing", icon: "📈" },
            { title: "Video Editing", icon: "🎬" },
            { title: "App Development", icon: "📱" },
            { title: "Data Science & AI", icon: "🤖" },
            { title: "Virtual Assistance", icon: "👩‍💼" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow rounded-xl text-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-800 text-white mt-16">
        <p>© {new Date().getFullYear()} FreeLanceHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
