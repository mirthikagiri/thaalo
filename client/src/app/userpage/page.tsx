
"use client";
import React from "react";

const vendors = [
  {
    name: "Puffed Rice Palace",
    description: "Premium puffed rice, fresh and crispy. Perfect for snacks and chaats.",
    rating: "⭐⭐⭐⭐☆",
    reviews: 124,
    location: "Chennai, Tamil Nadu",
    review: "Crispy and fresh! My kids love it.",
    suggestion: "Try with spicy masala for extra flavor.",
    img: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Rice Delight",
    description: "Organic puffed rice sourced from local farms. Healthy and tasty.",
    rating: "⭐⭐⭐⭐⭐",
    reviews: 98,
    location: "Chennai, Tamil Nadu",
    review: "Best organic puffed rice I've tasted.",
    suggestion: "Perfect for breakfast bowls.",
    img: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    name: "Chaat Corner",
    description: "Best puffed rice for bhel puri and other street food favorites.",
    rating: "⭐⭐⭐⭐",
    reviews: 76,
    location: "Chennai, Tamil Nadu",
    review: "Great for making bhel puri at home.",
    suggestion: "Add onions and lemon for a tangy twist.",
    img: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    name: "Healthy Hub",
    description: "Low-calorie puffed rice, ideal for diet snacks and breakfast bowls.",
    rating: "⭐⭐⭐⭐☆",
    reviews: 54,
    location: "Chennai, Tamil Nadu",
    review: "Healthy and light, good for snacking.",
    suggestion: "Mix with curd and veggies for a filling meal.",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Snack Express",
    description: "Quick delivery of fresh puffed rice and other snack essentials.",
    rating: "⭐⭐⭐⭐⭐",
    reviews: 142,
    location: "Chennai, Tamil Nadu",
    review: "Fast delivery and great quality.",
    suggestion: "Order in bulk for parties!",
    img: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    name: "Rice Bazaar",
    description: "Wide variety of puffed rice and related products at great prices.",
    rating: "⭐⭐⭐⭐",
    reviews: 67,
    location: "Chennai, Tamil Nadu",
    review: "Affordable and tasty options.",
    suggestion: "Try their spicy puffed rice mix.",
    img: "https://randomuser.me/api/portraits/women/66.jpg"
  },
  {
    name: "Golden Grain Mart",
    description: "Finest selection of golden puffed rice, perfect for every occasion.",
    rating: "⭐⭐⭐⭐⭐",
    reviews: 110,
    location: "Chennai, Tamil Nadu",
    review: "Golden and crunchy, highly recommend.",
    suggestion: "Pairs well with tea.",
    img: "https://randomuser.me/api/portraits/men/77.jpg"
  },
  {
    name: "Super Snacks",
    description: "Delicious puffed rice snacks and mixes, ready to eat.",
    rating: "⭐⭐⭐⭐",
    reviews: 89,
    location: "Chennai, Tamil Nadu",
    review: "Ready to eat and super tasty.",
    suggestion: "Great for evening snacks.",
    img: "https://randomuser.me/api/portraits/women/88.jpg"
  },
  {
    name: "Bhel House",
    description: "Specialty puffed rice for bhel puri and other Indian snacks.",
    rating: "⭐⭐⭐⭐☆",
    reviews: 73,
    location: "Chennai, Tamil Nadu",
    review: "Perfect for homemade bhel puri.",
    suggestion: "Add tamarind for authentic taste.",
    img: "https://randomuser.me/api/portraits/men/99.jpg"
  },
  {
    name: "Fresh Fields",
    description: "Farm-fresh puffed rice, delivered daily for maximum freshness.",
    rating: "⭐⭐⭐⭐⭐",
    reviews: 120,
    location: "Chennai, Tamil Nadu",
    review: "Always fresh and delicious.",
    suggestion: "Use in salads for crunch.",
    img: "https://randomuser.me/api/portraits/women/10.jpg"
  },
];

const news = [
  "Tomato 🍅 price dropped by ₹10!",
  "Mint Leaves 🌿 back in stock.",
  "Curd 🥛 price increased by ₹5.",
];

export default function VendorMarketplace() {
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("name");

  // Filter and sort vendors
  const filteredVendors = vendors
    .filter(v =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "location") return a.location.localeCompare(b.location);
      if (sortBy === "review") return b.reviews - a.reviews;
      if (sortBy === "rate") return b.rating.length - a.rating.length;
      if (sortBy === "description") return a.description.localeCompare(b.description);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-[340px] bg-white shadow-lg p-8 flex flex-col gap-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Search Vendors 🔍</h2>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, location, etc..."
            className="w-full py-3 px-5 text-lg rounded-full border border-gray-300 shadow focus:border-blue-500 outline-none transition text-black mb-4"
          />
          <label className="block mb-2 text-base font-semibold text-black">Sort By:</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="w-full py-2 px-3 rounded-lg border border-gray-300 text-base text-black bg-gray-50 shadow"
          >
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="review">Review Count</option>
            <option value="rate">Rating</option>
            <option value="description">Description</option>
          </select>
        </div>
      </aside>
      {/* Main Section */}
      <main className="flex-1 p-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Meet our Top vendors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {filteredVendors.map((v, idx) => (
            <div
              key={v.name}
              className="bg-white rounded-2xl shadow p-8 flex flex-col gap-3 hover:shadow-blue-200 transition-shadow min-h-[220px]"
            >
              <div className="flex items-center gap-4 mb-2">
                <img src={v.img} alt={v.name} className="w-14 h-14 rounded-full object-cover" />
                <div className="text-2xl font-bold text-black">{v.name}</div>
              </div>
              <div className="text-gray-700 text-base mb-1">{v.description}</div>
              <div className="flex items-center gap-3 text-base">
                <span className="text-yellow-500">{v.rating}</span>
                <span className="text-gray-600">📝 {v.reviews} reviews</span>
                <span className="text-gray-600">📍 {v.location}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600 italic">"{v.review}"</div>
              <div className="text-xs text-gray-500">Suggestion: {v.suggestion}</div>
            </div>
          ))}
        </div>
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
