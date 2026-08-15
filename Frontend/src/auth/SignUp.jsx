import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/api/user/addUser`, { name, email, password, type: role });
      toast.success("Signup successful");
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-5">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Create Account</h2>
        <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-white">
          <option value="user">User</option>
          <option value="seller">Seller</option>
        </select>
        <button onClick={handleClick} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Register</button>
      </form>
    </div>
  )
}
export default SignUp