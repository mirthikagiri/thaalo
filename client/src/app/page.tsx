"use client";
import React, { useState } from "react";

const LANGUAGES = [
  { code: "hi", label: "Hindi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "mr", label: "Marathi" },
  { code: "kn", label: "Kannada" },
  { code: "ml", label: "Malayalam" },
];

const ORANGE = "#FF914D";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"user" | "vendor">("user");
  const [language, setLanguage] = useState("hi");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
    shopName: "",
    ownerName: "",
    address: "",
    city: "",
    pincode: "",
    gstin: "",
    fssai: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submit logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white" style={{ background: "#fff7f0" }}>
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white flex flex-col items-center">
        {/* Logo and Heading */}
        <div className="mb-6 flex flex-col items-center">
          <span className="text-3xl font-bold tracking-wide" style={{ color: ORANGE }}>
            Thaalo
          </span>
          <h2 className="mt-2 text-xl font-semibold text-gray-800">Welcome to Thaalo</h2>
        </div>
        {/* User/Vendor Toggle */}
        <div className="flex mb-6 w-full justify-center gap-2">
          <button
            className={`flex-1 py-2 rounded-l-lg font-medium transition-colors ${role === "user" ? `bg-[${ORANGE}] text-white` : "bg-white text-gray-700 border border-gray-200"}`}
            style={role === "user" ? { background: ORANGE, color: "#fff" } : {}}
            onClick={() => setRole("user")}
            type="button"
          >
            User
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg font-medium transition-colors ${role === "vendor" ? `bg-[${ORANGE}] text-white` : "bg-white text-gray-700 border border-gray-200"}`}
            style={role === "vendor" ? { background: ORANGE, color: "#fff" } : {}}
            onClick={() => setRole("vendor")}
            type="button"
          >
            Vendor
          </button>
        </div>
        {/* Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Signup fields */}
          {mode === "signup" && role === "user" && (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInput}
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInput}
                placeholder="Address"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInput}
                placeholder="City"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleInput}
                placeholder="Pincode"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                pattern="[0-9]{6}"
                maxLength={6}
              />
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleInput}
                placeholder="Mobile Number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                pattern="[0-9]{10}"
                maxLength={10}
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInput}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                minLength={6}
              />
            </>
          )}
          {mode === "signup" && role === "vendor" && (
            <>
              <input
                type="text"
                name="shopName"
                value={form.shopName}
                onChange={handleInput}
                placeholder="Shop Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleInput}
                placeholder="Owner Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInput}
                placeholder="Address"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInput}
                placeholder="City"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleInput}
                placeholder="Pincode"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                pattern="[0-9]{6}"
                maxLength={6}
              />
              <input
                type="text"
                name="gstin"
                value={form.gstin}
                onChange={handleInput}
                placeholder="GSTIN Number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="fssai"
                value={form.fssai}
                onChange={handleInput}
                placeholder="FSSAI Number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
            </>
          )}
          {/* Login fields */}
          {mode === "login" && (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInput}
                placeholder="Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
              />
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleInput}
                placeholder="Mobile Number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                pattern="[0-9]{10}"
                maxLength={10}
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInput}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                minLength={6}
              />
            </>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg font-semibold text-white shadow-sm transition-colors"
            style={{ background: ORANGE }}
          >
            Send OTP
          </button>
        </form>
        {/* Toggle Link */}
        <div className="mt-4 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{' '}
              <button
                className="text-orange-500 font-medium hover:underline"
                onClick={() => setMode("signup")}
                type="button"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-orange-500 font-medium hover:underline"
                onClick={() => setMode("login")}
                type="button"
              >
                Log In
              </button>
            </>
          )}
        </div>
        {/* Language Selector */}
        <div className="mt-8 w-full flex flex-col items-center">
          <label htmlFor="language" className="mb-1 text-gray-500 text-xs">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-700"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
