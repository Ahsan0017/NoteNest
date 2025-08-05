import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/noteContext';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const [error, setError] = useState(""); // For displaying errors
  const { getUser } = useContext(NoteContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    setError(""); // Clear previous error

    if (password !== cpassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await fetch("https://notenest-backend-yn27.onrender.com/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        await getUser();
        navigate('/');
      } else {
        setError(json.error || "Signup failed. Please try again.");
      }

    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 shadow p-4 rounded bg-light">
        <h2 className="text-center mb-4 text-primary">Create Your NoteNest Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
              minLength={5}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-1">
            <label htmlFor="cpassword" className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              value={credentials.cpassword}
              onChange={onChange}
              required
              minLength={5}
              placeholder="Confirm your password"
            />
          </div>

          {/* 👇 Inline error if password mismatch or signup fails */}
          {error && (
            <div className="text-danger mb-3" style={{ fontSize: "14px" }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-2">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
