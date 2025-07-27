'use client';

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Link from 'next/link';

// Dummy Data
const data = [
  { name: "Mon", sales: 4000, revenue: 2400 },
  { name: "Tue", sales: 3000, revenue: 1398 },
  { name: "Wed", sales: 2000, revenue: 9800 },
  { name: "Thu", sales: 2780, revenue: 3908 },
  { name: "Fri", sales: 1890, revenue: 4800 },
  { name: "Sat", sales: 2390, revenue: 3800 },
  { name: "Sun", sales: 3490, revenue: 4300 },
];

export default function Page() {
  return (
    <div className="p-2 md:p-6 font-sans bg-gray-100 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar - glassmorphism blue */}
      <aside className="w-full md:w-56 mb-6 md:mb-0 md:mr-8 bg-blue-600/80 backdrop-blur-lg text-white rounded-3xl p-6 shadow-xl flex-shrink-0 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold mb-8 animate-pulse text-white drop-shadow-lg text-center">Welcome Vendor 🧑‍🍳</h1>
        <nav className="flex flex-col space-y-4 w-full text-[15px]">
          <Link href="/vendorhome" className="hover:underline font-bold text-white transition-colors">🔧 Update Profile</Link>
          <Link href="/vendorhome/addproduct" className="hover:underline font-bold text-white transition-colors">➕ Add Product</Link>
          <Link href="/vendorhome/customer" className="hover:underline font-bold text-white transition-colors">👥 Customer</Link>
          <Link href="/ratings" className="hover:underline font-bold text-white transition-colors">⭐ Ratings & Reviews</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white/80 p-5 md:p-6 shadow-lg rounded-2xl flex flex-col items-start border border-[#F5426C]/10">
            <h2 className="text-lg font-extrabold mb-2 text-black">Total Stock</h2>
            <p className="text-2xl font-bold text-green-600">₹32,500</p>
          </div>
          <div className="bg-white/80 p-5 md:p-6 shadow-lg rounded-2xl flex flex-col items-start border border-[#F5426C]/10">
            <h2 className="text-lg font-extrabold mb-2 text-black">Remaining Stock</h2>
            <p className="text-2xl font-bold text-yellow-500">128 items</p>
          </div>
          <div className="bg-white/80 p-5 md:p-6 shadow-lg rounded-2xl flex flex-col items-start border border-[#F5426C]/10">
            <h2 className="text-lg font-extrabold mb-2 text-black">Sales Summary</h2>
            <p className="text-2xl font-bold text-blue-600">₹17,200</p>
          </div>
        </div>

        {/* Graph + Chatbot */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Graph */}
          <div className="bg-white/90 p-5 md:p-6 shadow-lg rounded-2xl w-full lg:w-2/3 mx-auto flex flex-col">
            <h2 className="text-lg font-extrabold mb-4 text-black">Sales vs Revenue 📈</h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chatbot */}
          <div className="bg-white/90 p-4 md:p-6 shadow-lg rounded-2xl lg:w-1/3 h-[320px] flex flex-col justify-between border border-[#F5426C]/10">
            <div>
              <h2 className="text-lg font-extrabold mb-2 text-black">Ask Our Assistant 🤖</h2>
              <div className="border rounded-md h-[180px] p-2 text-sm text-gray-600 overflow-auto bg-white/60">
                <p>Hello! How can I help you today?</p>
              </div>
            </div>
            <div className="flex mt-4 items-center gap-2">
              <button className="bg-[#F5426C] text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#d42a5c] transition-colors mr-2 shadow-lg">
                🎤
              </button>
              <input
                type="text"
                placeholder="Speak or type here..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none text-sm bg-white/80"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}