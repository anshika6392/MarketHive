import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate=useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        // console.log("hahahahhaha")
        try {
            const response = await axios.post("http://localhost:5000/api/user/login", { email, password },{ withCredentials: true });
            localStorage.setItem("token", response.data.data.token);
            console.log(response);
            toast.success("Login Successfull");
            navigate('/');
        } catch (error) {
            console.log("Err : ",error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-8 rounded-2xl shadow-lg w-80 space-y-5">

                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleClick}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>

                <p className="text-sm text-center text-gray-500">
                    Don't have an account?{" "}
                    <span className="text-blue-500 cursor-pointer hover:underline" onClick={()=>{navigate("/signIn")}} >
                        Sign up
                    </span>
                </p>

            </form>
        </div>

    )
}

export default Login

