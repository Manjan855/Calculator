import React, { useState } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  // State to manage email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate login logic (replace with actual API call)
    if (email === "user@example.com" && password === "password123") {
      setError(""); // Clear any previous errors
      alert("Login successful!");
      // Redirect or perform other actions after successful login
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="heading">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          {/* Email Input */}
          <div className="email">
            <label>
              Email
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          {/* Password Input */}
          <div className="password">
            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Display error message if any */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit Button */}
          <input className="btn" type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
}
