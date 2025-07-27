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
    
    if (!isFormValid()) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setEmailLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      console.log("Starting authentication process...");
      console.log("Mode:", mode, "Role:", role);
      
      if (mode === "login") {
        console.log("Attempting to sign in with email:", form.email);
        await signInWithEmailAndPassword(auth, form.email, form.password);
        setSuccessMessage("Logged in successfully!");
        console.log("Login successful");
      } else {
        console.log("Attempting to create account with email:", form.email);
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;
        console.log("User created successfully:", user.uid);
        
        const docRef = doc(db, role === "user" ? "users" : "vendors", user.uid);
        const dataToSave = role === "user" ? {
          name: form.name,
          email: form.email,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          language: language,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        } : {
          shopName: form.shopName,
          ownerName: form.ownerName,
          email: form.email,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          gstin: form.gstin,
          fssai: form.fssai,
          language: language,
          role: "vendor",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        console.log("Saving user data to Firestore...");
        await setDoc(docRef, dataToSave);
        setSuccessMessage("Account created successfully!");
        console.log("Account creation completed");
      }
    } catch (error: any) {
      console.error("Authentication error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      // Handle specific Firebase Auth errors
      if (error.code === 'auth/user-not-found') {
        setErrorMessage("No account found with this email. Please check your email or sign up.");
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage("Incorrect password. Please try again.");
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("An account with this email already exists. Please try logging in instead.");
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage("Password is too weak. Please use at least 6 characters.");
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage("Invalid email address. Please check your email format.");
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage("Too many failed attempts. Please try again later.");
      } else if (error.code === 'auth/network-request-failed') {
        setErrorMessage("Network error. Please check your internet connection and try again.");
      } else {
        setErrorMessage(error.message || "Authentication failed. Please try again.");
      }
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      console.log("Starting Google authentication...");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google authentication successful:", user.uid);
      
      const docRef = doc(db, role === "user" ? "users" : "vendors", user.uid);
      const existingDoc = await getDoc(docRef);
      
      if (!existingDoc.exists()) {
        console.log("Creating new user document in Firestore...");
        const dataToSave = role === "user" ? {
          name: user.displayName || "",
          email: user.email,
          address: "",
          city: "",
          pincode: "",
          language: language,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        } : {
          shopName: "",
          ownerName: user.displayName || "",
          email: user.email, 
          address: "",
          city: "",
          pincode: "",
          gstin: "",
          fssai: "",
          language: language,
          role: "vendor",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        await setDoc(docRef, dataToSave, { merge: true });
        console.log("New user document created");
      } else {
        console.log("Updating existing user document...");
        await setDoc(docRef, {
          lastLogin: new Date().toISOString()
        }, { merge: true });
        console.log("User document updated");
      }
      setSuccessMessage("Signed in successfully with Google!");
    } catch (error: any) {
      console.error("Google authentication error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      if (error.code !== 'auth/cancelled-popup-request') {
        if (error.code === 'auth/popup-closed-by-user') {
          setErrorMessage("Sign-in was cancelled. Please try again.");
        } else if (error.code === 'auth/popup-blocked') {
          setErrorMessage("Pop-up was blocked. Please allow pop-ups for this site and try again.");
        } else if (error.code === 'auth/account-exists-with-different-credential') {
          setErrorMessage("An account already exists with the same email but different sign-in credentials.");
        } else if (error.code === 'auth/network-request-failed') {
          setErrorMessage("Network error. Please check your internet connection and try again.");
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
    <div className="auth-container">
      <div className="auth-card">
        {/* Header Section */}
        <header className="auth-header">
          <div className="logo-section">
            <h1 className="logo">thaalo</h1>
            <p className="tagline">Welcome to thaalo</p>
        </div>
        </header>



        {/* Role Toggle */}
        <div className="role-toggle">
          <button
            className={`role-btn ${role === "user" ? "active" : ""}`}
            onClick={() => setRole("user")}
            type="button"
            disabled={emailLoading || googleLoading}
          >
            User
          </button>
          <button
            className={`role-btn ${role === "vendor" ? "active" : ""}`}
            onClick={() => setRole("vendor")}
            type="button"
            disabled={emailLoading || googleLoading}
          >
            Vendor
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
            type="button"
            disabled={emailLoading || googleLoading}
          >
            Login
          </button>
          <button
            className={`mode-btn ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
            type="button"
            disabled={emailLoading || googleLoading}
          >
            Sign Up
          </button>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="message success">
            <svg className="message-icon" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="message error">
            <svg className="message-icon" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </div>
        )}

        {/* Language Selector */}
        <div className="language-selector">
          <label htmlFor="language">Preferred Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
            disabled={emailLoading || googleLoading}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Main Form */}
        <form className="auth-form" onSubmit={handleEmailAuth}>
          {/* User Signup Fields */}
          {mode === "signup" && role === "user" && (
            <div className="form-fields">
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
              <input
                type="text"
                  id="name"
                name="name"
                value={form.name}
                onChange={handleInput}
                  placeholder="Enter your full name"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
              <input
                type="email"
                  id="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                  placeholder="Enter your email"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
              <input
                type="password"
                  id="password"
                name="password"
                value={form.password}
                onChange={handleInput}
                  placeholder="Enter your password"
                required
                minLength={6}
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-group">
                <label htmlFor="address">Address</label>
              <input
                type="text"
                  id="address"
                name="address"
                value={form.address}
                onChange={handleInput}
                  placeholder="Enter your address"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="city">City</label>
              <input
                type="text"
                    id="city"
                name="city"
                value={form.city}
                onChange={handleInput}
                placeholder="City"
                required
                disabled={emailLoading || googleLoading}
              />
                </div>

                <div className="input-group">
                  <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                    id="pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleInput}
                placeholder="Pincode"
                required
                pattern="[0-9]{6}"
                maxLength={6}
                disabled={emailLoading || googleLoading}
              />
                </div>
              </div>
            </div>
          )}

          {/* Vendor Signup Fields */}
          {mode === "signup" && role === "vendor" && (
            <div className="form-fields">
              <div className="input-group">
                <label htmlFor="shopName">Shop Name</label>
              <input
                type="text"
                  id="shopName"
                name="shopName"
                value={form.shopName}
                onChange={handleInput}
                  placeholder="Enter shop name"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-group">
                <label htmlFor="ownerName">Owner Name</label>
              <input
                type="text"
                  id="ownerName"
                name="ownerName"
                value={form.ownerName}
                onChange={handleInput}
                  placeholder="Enter owner name"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
              <input
                type="email"
                  id="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                  placeholder="Enter your email"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
              <input
                type="password"
                  id="password"
                name="password"
                value={form.password}
                onChange={handleInput}
                  placeholder="Enter your password"
                required
                minLength={6}
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-group">
                <label htmlFor="address">Address</label>
              <input
                type="text"
                  id="address"
                name="address"
                value={form.address}
                onChange={handleInput}
                  placeholder="Enter shop address"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="city">City</label>
              <input
                type="text"
                    id="city"
                name="city"
                value={form.city}
                onChange={handleInput}
                placeholder="City"
                required
                disabled={emailLoading || googleLoading}
              />
                </div>

                <div className="input-group">
                  <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                    id="pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleInput}
                placeholder="Pincode"
                required
                pattern="[0-9]{6}"
                maxLength={6}
                disabled={emailLoading || googleLoading}
              />
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="gstin">GSTIN</label>
              <input
                type="text"
                    id="gstin"
                name="gstin"
                value={form.gstin}
                onChange={handleInput}
                    placeholder="GSTIN number"
                required
                disabled={emailLoading || googleLoading}
              />
                </div>

                <div className="input-group">
                  <label htmlFor="fssai">FSSAI</label>
              <input
                type="text"
                    id="fssai"
                name="fssai"
                value={form.fssai}
                onChange={handleInput}
                    placeholder="FSSAI number"
                required
                disabled={emailLoading || googleLoading}
              />
                </div>
              </div>
            </div>
          )}

          {/* Login Fields */}
          {mode === "login" && (
            <div className="form-fields">
              <div className="input-group">
                <label htmlFor="loginEmail">Email Address</label>
              <input
                type="email"
                  id="loginEmail"
                name="email"
                value={form.email}
                onChange={handleInput}
                  placeholder="Enter your email"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>

              <div className="input-group">
                <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                  id="loginPassword"
                name="password"
                value={form.password}
                onChange={handleInput}
                  placeholder="Enter your password"
                required
                disabled={emailLoading || googleLoading}
              />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={emailLoading || googleLoading || !isFormValid()}
          >
            {emailLoading ? (
              <>
                <LoadingSpinner />
                {mode === "login" ? "Signing In..." : "Creating Account..."}
              </>
            ) : (
              mode === "login" ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>or</span>
        </div>

        {/* Google Sign In */}
          <button
            type="button"
          className="google-btn"
            onClick={handleGoogleAuth}
          disabled={googleLoading || emailLoading}
        >
          {googleLoading ? (
            <>
              <LoadingSpinner />
              Signing in with Google...
            </>
          ) : (
            <>
              <svg className="google-icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fff7f0 0%, #ffe4d6 100%);
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .auth-card {
          width: 100%;
          max-width: 480px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 40px;
          position: relative;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .logo-section {
          margin-bottom: 20px;
        }

        .logo {
          font-size: 2.5rem;
          font-weight: 800;
          color: ${ORANGE};
          margin: 0;
          letter-spacing: -0.02em;
        }

        .tagline {
          font-size: 1.1rem;
          color: #666;
          margin: 8px 0 0 0;
          font-weight: 500;
        }

        .offline-alert {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #dc2626;
          font-size: 0.9rem;
        }

        .offline-icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .role-toggle {
          display: flex;
          background: #f3f4f6;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .role-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
        }

        .role-btn.active {
          background: ${ORANGE};
          color: white;
          box-shadow: 0 2px 8px rgba(255, 145, 77, 0.3);
        }

        .role-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mode-toggle {
          display: flex;
          background: #f3f4f6;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .mode-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #6b7280;
        }

        .mode-btn.active {
          background: ${ORANGE};
          color: white;
          box-shadow: 0 2px 8px rgba(255, 145, 77, 0.3);
        }

        .mode-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .message {
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .message.success {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
        }

        .message.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
        }

        .message-icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .language-selector {
          margin-bottom: 20px;
        }

        .language-selector label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
        }

        .language-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          font-size: 0.95rem;
          transition: border-color 0.2s ease;
        }

        .language-select:focus {
          outline: none;
          border-color: ${ORANGE};
        }

        .language-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-form {
          margin-bottom: 20px;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          margin-bottom: 6px;
          font-weight: 600;
          color: #374151;
          font-size: 0.9rem;
        }

        .input-group input {
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          background: white;
        }

        .input-group input:focus {
          outline: none;
          border-color: ${ORANGE};
          box-shadow: 0 0 0 3px rgba(255, 145, 77, 0.1);
        }

        .input-group input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #f9fafb;
        }

        .input-group input::placeholder {
          color: #9ca3af;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: ${ORANGE};
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #e67e22;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(255, 145, 77, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e5e7eb;
        }

        .divider span {
          background: white;
          padding: 0 16px;
          color: #6b7280;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .google-btn {
          width: 100%;
          padding: 16px;
          background: white;
          color: #374151;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .google-btn:hover:not(:disabled) {
          background: #f9fafb;
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .google-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .google-icon {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 24px;
            margin: 10px;
          }

          .input-row {
            grid-template-columns: 1fr;
          }

          .logo {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
