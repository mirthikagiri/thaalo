'use client';

import React from 'react';

export default function UpdateProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="md:w-1/3 w-full flex flex-col items-center bg-blue-600 text-white py-10 px-6 relative">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg mb-3 border-4 border-blue-200 transition-transform duration-300 hover:scale-105">
              <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25v-.75z" />
              </svg>
            </div>
            <a href="#" className="text-sm text-blue-100 hover:text-white underline transition-colors duration-200 mb-4">Change</a>
          </div>
          <div className="w-full border-t border-blue-200 my-4"></div>
          <div className="w-full bg-white text-blue-700 rounded-xl shadow-md py-6 px-4 mt-2 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Vendor Description</h2>
            <p className="text-sm text-blue-500 text-center">Add a short description about your business, specialties, or services here.</p>
          </div>
        </div>
        {/* Right Panel */}
        <div className="md:w-2/3 w-full bg-white py-10 px-8 flex flex-col justify-between">
          <form className="flex flex-col h-full">
            <div className="flex flex-col md:flex-row gap-8 flex-1">
              {/* First Column */}
              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <label className="block text-blue-700 font-medium mb-1">First Name</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-blue-900" />
                </div>
                <div>
                  <label className="block text-blue-700 font-medium mb-1">Phone Number</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-blue-900" />
                </div>
                <div>
                  <label className="block text-blue-700 font-medium mb-1">City</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-blue-900" />
                </div>
                <div>
                  <label className="block text-blue-700 font-medium mb-1">Postcode</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-blue-900" />
                </div>
              </div>
              {/* Second Column */}
              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <label className="block text-blue-700 font-medium mb-1">Last Name</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-blue-900" />
                </div>
                <div>
                  <label className="block text-blue-700 font-medium mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-blue-900" />
                </div>
                <div>
                  <label className="block text-blue-700 font-medium mb-1">State</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-blue-900" />
                </div>
                <div>
                  <label className="block text-blue-700 font-medium mb-1">Country</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 bg-white text-blue-900" />
                </div>
              </div>
            </div>
            {/* Update Button */}
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="w-60 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}