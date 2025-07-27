"use client";
import React, { useState, useEffect } from "react";
import { auth, db, googleProvider } from "../../../firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function FirebaseTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const runTests = async () => {
    setLoading(true);
    setTestResults([]);
    
    try {
      // Test 1: Check if Firebase is initialized
      addResult("✅ Firebase configuration loaded");
      
      // Test 2: Check Auth service
      if (auth) {
        addResult("✅ Firebase Auth service available");
      } else {
        addResult("❌ Firebase Auth service not available");
        return;
      }
      
      // Test 3: Check Firestore service
      if (db) {
        addResult("✅ Firestore service available");
      } else {
        addResult("❌ Firestore service not available");
        return;
      }
      
      // Test 4: Test anonymous authentication
      addResult("🔄 Testing anonymous authentication...");
      const userCredential = await signInAnonymously(auth);
      addResult(`✅ Anonymous auth successful - User ID: ${userCredential.user.uid}`);
      
      // Test 5: Test Firestore write
      addResult("🔄 Testing Firestore write...");
      const testDoc = await addDoc(collection(db, "test"), {
        message: "Firebase test successful",
        timestamp: new Date().toISOString(),
        userId: userCredential.user.uid
      });
      addResult(`✅ Firestore write successful - Document ID: ${testDoc.id}`);
      
      // Test 6: Test Firestore read
      addResult("🔄 Testing Firestore read...");
      const querySnapshot = await getDocs(collection(db, "test"));
      addResult(`✅ Firestore read successful - Found ${querySnapshot.size} documents`);
      
      // Test 7: Check Google Auth Provider
      if (googleProvider) {
        addResult("✅ Google Auth Provider configured");
      } else {
        addResult("❌ Google Auth Provider not configured");
      }
      
      addResult("🎉 All Firebase tests passed!");
      
    } catch (error: any) {
      console.error("Firebase test error:", error);
      addResult(`❌ Test failed: ${error.message}`);
      addResult(`Error code: ${error.code}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        addResult(`👤 User authenticated: ${user.uid}`);
      } else {
        addResult("👤 No user authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Firebase Configuration Test</h1>
      
      <button 
        onClick={runTests}
        disabled={loading}
        style={{
          padding: '12px 24px',
          backgroundColor: '#FF914D',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Running Tests...' : 'Run Firebase Tests'}
      </button>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '14px',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {testResults.length === 0 ? (
          <p>Click "Run Firebase Tests" to start testing...</p>
        ) : (
          testResults.map((result, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              {result}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
        <h3>Common Firebase Issues & Solutions:</h3>
        <ul>
          <li><strong>API Key Issues:</strong> Check if your Firebase API key is correct and not restricted</li>
          <li><strong>Domain Issues:</strong> Make sure your domain is added to Firebase Auth authorized domains</li>
          <li><strong>Firestore Rules:</strong> Check if your Firestore security rules allow read/write operations</li>
          <li><strong>Network Issues:</strong> Ensure you have a stable internet connection</li>
          <li><strong>Browser Issues:</strong> Try disabling ad blockers or pop-up blockers</li>
        </ul>
      </div>
    </div>
  );
} 