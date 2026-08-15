import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

const CategoryWisePage = (state) => {

    const [products,setProduct]=useState([]);




    const location = useLocation();
    console.log(location.state);


    const getProductsByCategory = async () => {

        const data = await axios.get(`http://localhost:5000/api/category/getcategoryWiseProducts/${location.state.categoryId}`)
        console.log("-->", data.data.products);
         setProduct(data.data.products);
    }

    useEffect(() => {
        getProductsByCategory();
    }, [location.state])


    return (
        <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-10 mt-26">

            {/* Heading */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-black">
                    All Products
                </h1>

                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Explore all available products
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                {products?.map((p, i) => (

                    <div
                        key={i}
                        className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >

                        {/* Product Image */}
                        <div className="h-[170px] sm:h-[200px] overflow-hidden bg-gray-100">
                            <img
                                src={p?.images[0]?.url}
                                alt={p.name}
                                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-4 flex flex-col flex-grow">

                            {/* Product Name */}
                            <h2 className="text-black font-semibold text-sm sm:text-base line-clamp-2">
                                {p.name}
                            </h2>

                            {/* Price */}
                            <p className="text-green-600 font-bold text-lg mt-2">
                                ₹{p.price}
                            </p>

                            {/* Description */}
                            <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2">
                                {p.description}
                            </p>

                            {/* Buttons */}
                            <div className="mt-4 flex gap-2">

                                <button className="w-1/2 py-2 rounded-lg border border-gray-300 text-black text-sm hover:bg-gray-100 transition">
                                    Cart
                                </button>

                                <button className="w-1/2 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
                                    Buy Now
                                </button>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default CategoryWisePage