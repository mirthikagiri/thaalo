"use client"
/*
Create a responsive HTML webpage layout styled with CSS.

🎯 Page Title: "User Home Page - Grocery Dashboard"
*/
import React from "react";

const categories = [
  { name: "Puffed Rice", emoji: "🍚" },
  { name: "Boiled Potatoes", emoji: "🥔" },
  { name: "Mint Leaves", emoji: "🌿" },
  { name: "Curd", emoji: "🥛" },
  { name: "Tamarind", emoji: "🌰" },
  { name: "Chat Masala", emoji: "🧂" },
  { name: "Onions", emoji: "🧅" },
  { name: "Sev", emoji: "🍜" },
  { name: "Coriander", emoji: "🌿" },
  { name: "Lemon", emoji: "🍋" },
  { name: "Peanuts", emoji: "🥜" },
  { name: "Cucumber", emoji: "🥒" },
];

const vendors = [
  {
    name: "FreshMart",
    img: "👩‍🌾",
    rating: "⭐⭐⭐⭐☆",
  },
  {
    name: "GreenLeaf",
    img: "🧑‍🌾",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    name: "DailyVeggies",
    img: "👨‍🌾",
    rating: "⭐⭐⭐⭐☆",
  },
];

const news = [
  "Tomato 🍅 price dropped by ₹10!",
  "Mint Leaves 🌿 back in stock.",
  "Curd 🥛 price increased by ₹5.",
];


export default function UserHomePage() {
  return (
    <div className="flex min-h-screen bg-gray-100">



      {/* Main Content */}

      <main className="flex-1 p-10 flex flex-col items-center w-full">
        <h1 className="w-full text-center text-3xl font-bold mb-5 text-gray-800">Welcome to Your Grocery Hub 🛒</h1>
        <div className="w-3/5 mx-auto mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search groceries, vendors, or news..."
            className="w-full py-3 px-5 text-lg rounded-full border border-gray-300 shadow focus:border-blue-500 outline-none transition text-black"
          />
        </div>
        {/* Categories Section */}
        <section className="w-full mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black">Categories 🛒</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                className="bg-gray-50 rounded-xl shadow hover:shadow-blue-200 p-4 flex items-center gap-3 text-base text-black transition-shadow"
                key={cat.name}
              >
                <span className="text-xl">{cat.emoji}</span> {cat.name}
              </div>
            ))}
          </div>
        </section>
        {/* Vendors Section */}
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-black">Explore Vendors 🧑‍🌾</h2>
          <div className="flex flex-col gap-4">
            {vendors.map((v) => (
              <div
                className="bg-gray-50 rounded-xl shadow p-4 flex items-center justify-between hover:shadow-blue-200 transition-shadow"
                key={v.name}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                    {v.img}
                  </div>
                  <div>
                    <div className="font-semibold text-base text-black">{v.name}</div>
                    <div className="text-yellow-500 text-base text-black">{v.rating}</div>
                  </div>
                </div>
                <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-base shadow hover:bg-blue-700 hover:shadow-lg transition">View Profile</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="w-[340px] bg-white shadow-lg p-8 flex flex-col gap-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Today's Market News 🗞️</h2>
          <ul className="list-none p-0 m-0">
            {news.map((n, i) => (
              <li
                key={i}
                className="bg-gray-50 rounded-lg mb-2 p-3 shadow text-base text-black"
              >
                {n}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 rounded-xl shadow p-5 flex flex-col gap-3">
          <h3 className="text-base font-semibold text-blue-600">Ask Our Assistant 🤖</h3>
          <textarea
            className="w-full min-h-[60px] rounded-lg border border-gray-300 p-3 text-base bg-white resize-none mb-2 text-black"
            placeholder="Type your question here..."
          />
          <button
            className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl shadow hover:bg-blue-700 hover:shadow-lg transition"
            title="Voice Assistant"
          >
            🎤
          </button>
        </div>
      </aside>
    </div>
  );
}
