"use client";
import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
  const [isOnline, setIsOnline] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    ownerName: "",
    address: "",
    city: "",
    pincode: "",
    gstin: "",
    fssai: "",
  });
  
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Internet connectivity detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    // Check initial status
    setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Clear messages when mode/role changes
  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, [mode, role]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error message when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const isFormValid = () => {
    if (mode === "login") {
      return form.email && form.password;
    } else {
      if (role === "user") {
        return form.name && form.email && form.password && form.address && form.city && form.pincode;
      } else {
        return form.shopName && form.ownerName && form.email && form.password && 
               form.address && form.city && form.pincode && form.gstin && form.fssai;
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOnline) {
      setErrorMessage("You are offline. Please check your internet connection and try again.");
      return;
    }

    if (!isFormValid()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setEmailLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (mode === "login") {
        const userCred = await signInWithEmailAndPassword(auth, form.email, form.password);
        
        // Check role in Firestore
        const collection = role === "vendor" ? "vendors" : "users";
        const docRef = doc(db, collection, form.email);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          await signOut(auth);
          setErrorMessage("No account found for this role. Please check your login type.");
          return;
        }
        
        setSuccessMessage("Signed in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        
        // Save user/vendor data to Firestore
        const collection = role === "vendor" ? "vendors" : "users";
        const docRef = doc(db, collection, form.email);
        const dataToSave = { 
          ...form, 
          role, 
          mode, 
          timestamp: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        await setDoc(docRef, dataToSave);
        setSuccessMessage("Account created and signed in successfully!");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      
      // Handle specific Firebase Auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMessage("No account found with this email address.");
          break;
        case 'auth/wrong-password':
          setErrorMessage("Incorrect password. Please try again.");
          break;
        case 'auth/email-already-in-use':
          setErrorMessage("An account with this email already exists. Please log in instead.");
          break;
        case 'auth/weak-password':
          setErrorMessage("Password should be at least 6 characters long.");
          break;
        case 'auth/invalid-email':
          setErrorMessage("Please enter a valid email address.");
          break;
        case 'auth/network-request-failed':
        case 'auth/too-many-requests':
          setErrorMessage("Network error. Please check your connection and try again.");
          break;
        default:
          if (error.message && (error.message.includes("offline") || error.message.includes("client is offline"))) {
            setErrorMessage("You are offline. Please check your internet connection and try again.");
          } else {
            setErrorMessage(error.message || "Authentication failed. Please try again.");
          }
      }
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!isOnline) {
      setErrorMessage("You are offline. Please check your internet connection and try again.");
      return;
    }

    setGoogleLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in Firestore for the selected role
      const collection = role === "vendor" ? "vendors" : "users";
      const docRef = doc(db, collection, user.email!);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        await signOut(auth);
        setErrorMessage(`No ${role} account found with this Google email. Please sign up first or check your login type.`);
        return;
      }
      
      // Update user data in Firestore
      const dataToSave = { 
        email: user.email, 
        name: user.displayName || form.name, 
        role, 
        mode, 
        timestamp: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      await setDoc(docRef, dataToSave, { merge: true });
      setSuccessMessage("Signed in successfully with Google!");
    } catch (error: any) {
      console.error("Google auth error:", error);
      
      if (error.code !== 'auth/cancelled-popup-request') {
        if (error.code === 'auth/popup-closed-by-user') {
          setErrorMessage("Sign-in was cancelled. Please try again.");
        } else if (error.message && (error.message.includes("offline") || error.message.includes("client is offline"))) {
          setErrorMessage("You are offline. Please check your internet connection and try again.");
        } else {
          setErrorMessage(error.message || "Google authentication failed. Please try again.");
        }
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

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

        {/* Offline Status Indicator */}
        {!isOnline && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-600 text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              You are currently offline
            </div>
          </div>
        )}

        {/* User/Vendor Toggle */}
        <div className="flex mb-6 w-full justify-center gap-2">
          <button
            className={`flex-1 py-2 rounded-l-lg font-medium transition-colors ${role === "user" ? `bg-[${ORANGE}] text-white` : "bg-white text-gray-700 border border-gray-200"}`}
            style={role === "user" ? { background: ORANGE, color: "#fff" } : {}}
            onClick={() => setRole("user")}
            type="button"
            disabled={emailLoading || googleLoading}
          >
            User
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg font-medium transition-colors ${role === "vendor" ? `bg-[${ORANGE}] text-white` : "bg-white text-gray-700 border border-gray-200"}`}
            style={role === "vendor" ? { background: ORANGE, color: "#fff" } : {}}
            onClick={() => setRole("vendor")}
            type="button"
            disabled={emailLoading || googleLoading}
          >
            Vendor
          </button>
        </div>

        {/* Form */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleEmailAuth}>
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
                disabled={emailLoading || googleLoading}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
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
                disabled={emailLoading || googleLoading}
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInput}
                placeholder="Address"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
              />
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInput}
                placeholder="City"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
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
                disabled={emailLoading || googleLoading}
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
                disabled={emailLoading || googleLoading}
              />
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleInput}
                placeholder="Owner Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
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
                disabled={emailLoading || googleLoading}
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleInput}
                placeholder="Address"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
              />
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleInput}
                placeholder="City"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
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
                disabled={emailLoading || googleLoading}
              />
              <input
                type="text"
                name="gstin"
                value={form.gstin}
                onChange={handleInput}
                placeholder="GSTIN Number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
              />
              <input
                type="text"
                name="fssai"
                value={form.fssai}
                onChange={handleInput}
                placeholder="FSSAI Number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
              />
            </>
          )}

          {/* Login fields */}
          {mode === "login" && (
            <>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white text-gray-900 placeholder-gray-500"
                required
                disabled={emailLoading || googleLoading}
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
                disabled={emailLoading || googleLoading}
              />
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg font-semibold text-white shadow-sm transition-colors flex items-center justify-center"
            style={{ background: ORANGE }}
            disabled={emailLoading || googleLoading || !isOnline || !isFormValid()}
          >
            {emailLoading && <LoadingSpinner />}
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="w-full flex flex-col gap-2 mt-4">
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full py-2 rounded-lg font-semibold text-white shadow-sm transition-colors bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={googleLoading || emailLoading || !isOnline}
          >
            {googleLoading && <LoadingSpinner />}
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <g>
                <path d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 4.5 29.3 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5c10.5 0 20-8.5 20-20 0-1.3-.1-2.1-.3-3.5z" fill="#FFC107"/>
                <path d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 4.5 29.3 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5c10.5 0 20-8.5 20-20 0-1.3-.1-2.1-.3-3.5z" fill="#FF3D00"/>
                <path d="M24 43.5c5.8 0 10.7-1.9 14.7-5.2l-6.8-5.6C29.9 34.9 27.1 36 24 36c-5.7 0-10.5-3.7-12.2-8.8l-7 5.4C7.7 39.5 15.3 43.5 24 43.5z" fill="#4CAF50"/>
                <path d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 4.5 29.3 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5c10.5 0 20-8.5 20-20 0-1.3-.1-2.1-.3-3.5z" fill="none"/>
              </g>
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="w-full mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-600 font-semibold text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {successMessage}
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="w-full mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-600 font-semibold text-sm">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorMessage}
            </div>
          </div>
        )}

        {/* Toggle Link */}
        <div className="mt-4 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-orange-500 font-medium hover:underline"
                onClick={() => setMode("signup")}
                type="button"
                disabled={emailLoading || googleLoading}
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
                disabled={emailLoading || googleLoading}
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
            disabled={emailLoading || googleLoading}
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
