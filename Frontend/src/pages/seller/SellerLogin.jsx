import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SellerLogin = () => {
    const url = import.meta.env.VITE_URL;
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        type: "user",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                const response = await axios.post(
                    `${url}/api/user/login`,
                    {
                        email: formData.email,
                        password: formData.password,
                    },
                    {
                        withCredentials: true,
                    }
                );

                const userData = response.data.data;

                localStorage.setItem("token", userData.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        name: userData.name,
                        email: userData.email,
                        type: userData.type,
                    })
                );

                toast.success("Login Successful");
                navigate("/");
            } else {
                await axios.post(`${url}/api/user/addUser`, {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    type: formData.type,
                });

                toast.success("Account Created");

                setIsLogin(true);
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                error?.response?.data?.Error ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">

                <h2 className="text-3xl font-bold text-center mb-6">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    {!isLogin && (
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >

                            <option value="seller">
                                Seller
                            </option>
                        </select>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                    >
                        {isLogin ? "Login" : "Create Account"}
                    </button>

                </form>

                <p className="text-center mt-4">

                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 cursor-pointer ml-2"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </span>

                </p>

            </div>

        </div>
    );
};

export default SellerLogin;