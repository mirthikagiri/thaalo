"use client";

// src/app/addpage/page.tsx

import { useState } from "react";

// Modern Add/Update Product Admin Panel UI and logic moved from vendorhome/page.tsx
import React from "react";
import Link from 'next/link';

const CATEGORY_OPTIONS = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Grains",
  "Spices",
  "Beverages",
  "Bakery",
  "Meat",
  "Seafood",
  "Packaging",
  "Cleaning",
  "Miscellaneous",
];
const UNIT_OPTIONS = ["kg", "g", "litre", "ml", "pcs"];

export default function AddPage() {
  // Add Product State
  const [addImage, setAddImage] = React.useState<File | null>(null);
  const [addProductName, setAddProductName] = React.useState("");
  const [addCategory, setAddCategory] = React.useState("");
  const [addQuantity, setAddQuantity] = React.useState("");
  const [addUnit, setAddUnit] = React.useState(UNIT_OPTIONS[0]);
  const [addPrice, setAddPrice] = React.useState("");
  const [addDescription, setAddDescription] = React.useState("");
  const [addInStock, setAddInStock] = React.useState(false);
  const [addSuccess, setAddSuccess] = React.useState("");
  const [addError, setAddError] = React.useState("");

  // Update Product State
  const [updImage, setUpdImage] = React.useState<File | null>(null);
  const [updProductName, setUpdProductName] = React.useState("Sample Chips");
  const [updCategory, setUpdCategory] = React.useState(CATEGORY_OPTIONS[0]);
  const [updQuantity, setUpdQuantity] = React.useState("1");
  const [updUnit, setUpdUnit] = React.useState(UNIT_OPTIONS[0]);
  const [updPrice, setUpdPrice] = React.useState("99");
  const [updDescription, setUpdDescription] = React.useState("Crunchy, spicy, and fresh.");
  const [updInStock, setUpdInStock] = React.useState(true);
  const [updSuccess, setUpdSuccess] = React.useState("");
  const [updError, setUpdError] = React.useState("");

  // Add Product Handlers
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setAddImage(e.target.files[0]);
  };
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addProductName || !addCategory || !addQuantity || !addPrice) {
      setAddError("Please fill in all required fields.");
      setAddSuccess("");
      return;
    }
    setAddSuccess("Product added successfully!");
    setAddError("");
    setAddProductName("");
    setAddCategory("");
    setAddQuantity("");
    setAddUnit(UNIT_OPTIONS[0]);
    setAddPrice("");
    setAddDescription("");
    setAddInStock(false);
    setAddImage(null);
  };

  // Update Product Handlers
  const handleUpdImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUpdImage(e.target.files[0]);
  };
  const handleUpdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updProductName || !updCategory || !updQuantity || !updPrice) {
      setUpdError("Please fill in all required fields.");
      setUpdSuccess("");
      return;
    }
    setUpdSuccess("Product updated successfully!");
    setUpdError("");
  };
  const handleOutOfStock = () => {
    setUpdInStock(false);
    setUpdSuccess("");
    setUpdError("Product marked as out of stock.");
  };

  return (
    <div className="min-h-screen bg-[#FFF0F5] flex flex-col font-sans p-4 md:p-8">
      <header className="w-full flex justify-center items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F5426C] text-center w-full">THAALO Admin Panel</h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
        {/* Add Product Card */}
        <section className="bg-white border border-[#E0E0E0] rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-[#F5426C]">Add Product</h2>
          <form onSubmit={handleAddSubmit} className="flex flex-col gap-4 flex-1">
            {/* Image Upload */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                className="block w-full text-sm text-gray-700 border border-[#E0E0E0] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-gray-50 p-2"
              />
              {addImage && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">{addImage.name}</span>
                  <img
                    src={URL.createObjectURL(addImage)}
                    alt="Preview"
                    className="h-10 w-10 object-cover rounded shadow"
                  />
                </div>
              )}
            </div>
            {/* Product Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Product Name <span className="text-[#F5426C]">*</span></label>
              <input
                type="text"
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white"
                value={addProductName}
                onChange={e => setAddProductName(e.target.value)}
                required
              />
            </div>
            {/* Category */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Category <span className="text-[#F5426C]">*</span></label>
              <select
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white text-black font-bold"
                value={addCategory}
                onChange={e => setAddCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {/* Quantity + Unit */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block mb-1 font-medium text-gray-700">Quantity <span className="text-[#F5426C]">*</span></label>
                <input
                  type="number"
                  className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white"
                  value={addQuantity}
                  onChange={e => setAddQuantity(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Unit</label>
                <select
                  className="border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white text-black font-bold"
                  value={addUnit}
                  onChange={e => setAddUnit(e.target.value)}
                >
                  {UNIT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Price */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Price <span className="text-[#F5426C]">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                <input
                  type="number"
                  className="w-full border border-[#E0E0E0] rounded-lg px-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white"
                  value={addPrice}
                  onChange={e => setAddPrice(e.target.value)}
                  min={0}
                  step="0.01"
                  required
                />
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white min-h-[80px]"
                value={addDescription}
                onChange={e => setAddDescription(e.target.value)}
                rows={3}
              />
            </div>
            {/* In Stock */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="addInStock"
                checked={addInStock}
                onChange={e => setAddInStock(e.target.checked)}
                className="h-4 w-4 rounded border-[#E0E0E0] focus:ring-[#F5426C]"
              />
              <label htmlFor="addInStock" className="text-gray-700 text-sm">In Stock</label>
            </div>
            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#F5426C] hover:bg-[#d42a5c] text-white py-2 rounded-lg font-semibold shadow transition-colors"
            >
              Add Product
            </button>
            {/* Success/Error Message */}
            {(addSuccess || addError) && (
              <div className={`flex items-center gap-2 mt-2 px-3 py-2 rounded-lg text-sm font-medium border ${addSuccess ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {addSuccess ? (
                  <span className="text-lg">✓</span>
                ) : (
                  <span className="text-lg">✗</span>
                )}
                <span>{addSuccess || addError}</span>
              </div>
            )}
          </form>
        </section>

        {/* Update Product Card */}
        <section className="bg-white border border-[#E0E0E0] rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-[#F5426C]">Update Product</h2>
          {/* Image Row */}
          <div className="flex gap-4 mb-4 flex-col sm:flex-row">
            {/* Existing Image */}
            <div className="flex-1 flex flex-col items-center justify-center bg-[#FFF0F5] rounded-lg p-4 border border-[#E0E0E0]">
              <img
                src={updImage ? URL.createObjectURL(updImage) : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80'}
                alt="Product Preview"
                className="w-24 h-24 object-cover rounded shadow mb-2"
              />
              <span className="text-xs text-gray-500">Existing Image</span>
            </div>
            {/* New Image Upload */}
            <div className="flex-1 flex flex-col justify-center">
              <label className="block mb-1 font-medium text-gray-700">New Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpdImage}
                className="block w-full text-sm text-gray-700 border border-[#E0E0E0] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-gray-50 p-2"
              />
              {updImage && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">{updImage.name}</span>
                  <img
                    src={URL.createObjectURL(updImage)}
                    alt="Preview"
                    className="h-10 w-10 object-cover rounded shadow"
                  />
                </div>
              )}
            </div>
          </div>
          <form onSubmit={handleUpdSubmit} className="flex flex-col gap-4 flex-1">
            {/* Product Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Product Name <span className="text-[#F5426C]">*</span></label>
              <input
                type="text"
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white"
                value={updProductName}
                onChange={e => setUpdProductName(e.target.value)}
                required
              />
            </div>
            {/* Category */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Category <span className="text-[#F5426C]">*</span></label>
              <select
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white text-black font-bold"
                value={updCategory}
                onChange={e => setUpdCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            {/* Quantity + Unit */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block mb-1 font-medium text-gray-700">Quantity <span className="text-[#F5426C]">*</span></label>
                <input
                  type="number"
                  className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white"
                  value={updQuantity}
                  onChange={e => setUpdQuantity(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Unit</label>
                <select
                  className="border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white text-black font-bold"
                  value={updUnit}
                  onChange={e => setUpdUnit(e.target.value)}
                >
                  {UNIT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Price */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Price <span className="text-[#F5426C]">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                <input
                  type="number"
                  className="w-full border border-[#E0E0E0] rounded-lg px-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white"
                  value={updPrice}
                  onChange={e => setUpdPrice(e.target.value)}
                  min={0}
                  step="0.01"
                  required
                />
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F5426C] bg-white min-h-[80px]"
                value={updDescription}
                onChange={e => setUpdDescription(e.target.value)}
                rows={3}
              />
            </div>
            {/* In Stock */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="updInStock"
                checked={updInStock}
                onChange={e => setUpdInStock(e.target.checked)}
                className="h-4 w-4 rounded border-[#E0E0E0] focus:ring-[#F5426C]"
              />
              <label htmlFor="updInStock" className="text-gray-700 text-sm">In Stock</label>
            </div>
            {/* Buttons */}
            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="flex-1 bg-[#F5426C] hover:bg-[#d42a5c] text-white py-2 rounded-lg font-semibold shadow transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="flex-1 bg-[#E0E0E0] text-[#F5426C] hover:bg-[#f9b6c2] py-2 rounded-lg font-semibold shadow border border-[#F5426C] transition-colors"
                onClick={handleOutOfStock}
              >
                Out of Stock
              </button>
            </div>
            {/* Success/Error Message */}
            {(updSuccess || updError) && (
              <div className={`flex items-center gap-2 mt-2 px-3 py-2 rounded-lg text-sm font-medium border ${updSuccess ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {updSuccess ? (
                  <span className="text-lg">✓</span>
                ) : (
                  <span className="text-lg">✗</span>
                )}
                <span>{updSuccess || updError}</span>
              </div>
            )}
          </form>
        </section>
      </main>

      {/* Footer (optional) */}
      <footer className="w-full text-center text-xs text-gray-400 py-4 mt-auto">© {new Date().getFullYear()} THAALO Admin Panel</footer>
    </div>
  );
}

function UpdateProductForm() {
  const [newImage, setNewImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("Sample Chips");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("kg");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState("99");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setNewImage(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !quantity || !price) {
      setError("Please fill in all required fields.");
      setSuccess("");
      return;
    }
    setSuccess("Product updated successfully!");
    setError("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-10">
      <h2 className="text-xl font-bold mb-6 text-[#F5426C]">Update Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
        {/* Left: Existing Image */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#FFF0F5] rounded-lg p-4 border border-[#E0E0E0]">
          <img
            src={newImage ? URL.createObjectURL(newImage) : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80'}
            alt="Product Preview"
            className="w-32 h-32 object-cover rounded shadow mb-2"
          />
          <span className="text-xs text-gray-500">Current Image</span>
        </div>
        {/* Right: Upload and Fields (copied from Add/Update Product card for consistency) */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700 border border-[#e4c59e] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f9b572] bg-gray-50 p-2"
            />
            {newImage && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-500">{newImage.name}</span>
                <img
                  src={URL.createObjectURL(newImage)}
                  alt="Preview"
                  className="h-10 w-10 object-cover rounded shadow"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              className="w-full border border-[#e4c59e] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f9b572] bg-white"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                className="w-full border border-[#e4c59e] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f9b572] bg-white"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                min={0}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Unit</label>
              <select
                className="border border-[#e4c59e] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f9b572] bg-white text-black font-bold"
                value={unit}
                onChange={e => setUnit(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="litre">litre</option>
                <option value="ml">ml</option>
                <option value="pcs">pcs</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <select
              className="w-full border border-[#e4c59e] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f9b572] bg-white text-black font-bold"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains & Pulses">Grains & Pulses</option>
              <option value="Dairy">Dairy</option>
              <option value="Spices & Masala">Spices & Masala</option>
              <option value="Cooking Oils">Cooking Oils</option>
              <option value="Packaging Items">Packaging Items</option>
              <option value="Beverage Ingredients">Beverage Ingredients</option>
              <option value="Snacks & Ready Mixes">Snacks & Ready Mixes</option>
              <option value="Other Essentials">Other Essentials</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="w-full border border-[#e4c59e] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f9b572] bg-white"
              value={price}
              onChange={e => setPrice(e.target.value)}
              min={0}
              step="0.01"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F5426C] hover:bg-[#d42a5c] text-white py-2 rounded-lg font-semibold shadow transition-colors mt-2"
          >
            Save Changes
          </button>
          {(success || error) && (
            <div className={`flex items-center gap-2 mt-2 px-3 py-2 rounded-lg text-sm font-medium border ${success ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {success ? (
                <span className="text-lg">✓</span>
              ) : (
                <span className="text-lg">✗</span>
              )}
              <span>{success || error}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

// To use this component, render <UpdateProductForm /> where you want the form to appear.
