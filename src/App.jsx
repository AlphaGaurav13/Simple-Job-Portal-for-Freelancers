import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
// import Dashboard from "./components/dashboard";

// Single-file React component for a dashboard that visually matches the provided mockup.
// Uses Tailwind CSS for styling. Drop this file into your React/Vite project (e.g. src/components/Dashboard.jsx)
// Place the provided image in your project's public folder as `/dashboard-hero.jpg` (or update the path below).

export default function Dashboard() {
  const [authMode, setAuthMode] = useState(null); // 'login' | 'register' | null

  const closeAuth = () => setAuthMode(null);

  // When authMode is set, show the auth component directly
  if (authMode) {
    const isLogin = authMode === "login";
    return isLogin ? (
      <Login onClose={closeAuth} onSwitchToRegister={() => setAuthMode("register")} />
    ) : (
      <Register onClose={closeAuth} onSwitchToLogin={() => setAuthMode("login")} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white h-screen shadow-sm sticky top-0">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">T</div>
              <div className="text-lg font-semibold">TaskLance</div>
            </div>
          </div>

          <nav className="p-6 space-y-2 text-gray-600">
            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 7h18" stroke="currentColor" strokeWidth="2"/></svg>
              Dashboard
            </button>
            

            <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">Find Work</a>
            <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">My Proposals</a>
            <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">Profile</a>
            <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">Settings</a>
          </nav>
        </aside>
        

        {/* Main content */}
        <main className="flex-1 p-8">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Welcome Back, Kartik!</h1>
            <div className="flex items-center gap-4">
              <input placeholder="Search anything..." className="px-4 py-2 rounded-lg border bg-white" />
              <button
                onClick={() => setAuthMode("login")}
                className="px-4 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-semibold shadow hover:brightness-110 transition"
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Active Projects</p>
              <div className="text-2xl font-bold mt-2">3</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Invoices Pending</p>
              <div className="text-2xl font-bold mt-2">$2,400</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Proposals Sent</p>
              <div className="text-2xl font-bold mt-2">5</div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Pending Quotes</p>
              <div className="text-2xl font-bold mt-2">2</div>
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Project Income (large) */}
            <section className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-semibold">Project Income</h2>
                <select className="border rounded-md px-3 py-1">
                  <option>This month</option>
                </select>
              </div>

              {/* Simple bar chart using svg */}
              <div className="mt-6 h-56 flex items-end gap-6 px-6">
                {/** Bars: we mimic values for days 24-30 **/}
                {[
                  { day: 24, h: 28, color: 'bg-blue-600' },
                  { day: 25, h: 40, color: 'bg-gray-400' },
                  { day: 26, h: 56, color: 'bg-blue-600' },
                  { day: 27, h: 18, color: 'bg-gray-400' },
                  { day: 28, h: 64, color: 'bg-blue-600' },
                  { day: 29, h: 52, color: 'bg-gray-400' },
                  { day: 30, h: 48, color: 'bg-blue-600' },
                ].map((b) => (
                  <div key={b.day} className="flex flex-col items-center">
                    <div className={`rounded-t-lg ${b.color} w-8`} style={{ height: `${b.h}px` }} />
                    <div className="text-sm text-gray-500 mt-3">{b.day}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Proposal Acceptance (donut) */}
            <aside className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center">
              <h3 className="font-semibold mb-3">Proposal Acceptance Rate</h3>

              {/* Donut chart - simple svg */}
              <div className="w-40 h-40 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-40 h-40">
                  <path d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831A15.9155 15.9155 0 0 1 18 2.0845" fill="none" stroke="#e6e9ee" strokeWidth="4"/>
                  <path d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="54 100" strokeLinecap="round"/>
                  <text x="18" y="20" textAnchor="middle" fontSize="6" fill="#111">54</text>
                </svg>
              </div>

              <div className="text-sm text-gray-500 mt-3">54 Total Proposals</div>
            </aside>
          </div>

          {/* Project Progress Overview placeholder */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Project Progress Overview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded">Active: 3</div>
              <div className="p-4 border rounded">Completed: 7</div>
              <div className="p-4 border rounded">On Hold: 1</div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

