import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleClick = async (e) => {
    // to prevent the reload of the page
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/addUser', {
        name,
        email,
        password
      });
      alert("successfully signup");
      console.log(response);

    } catch (error) {
      console.log(error);
    }

  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-5">

        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* 🔽 Dropdown */}
        <select
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>

        <button
          onClick={handleClick}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </button>

      </form>
    </div>
  )
}

export default SignUp