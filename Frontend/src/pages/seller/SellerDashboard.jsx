import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SellerDashboard = () => {
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const [seller, setSeller] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSellerData = async () => {
    try {
      const loginRes = await axios.post(`${url}/api/user/checkLogin`, {}, { withCredentials: true });
      const sellerData = loginRes.data?.user;
      setSeller(sellerData);

      if (sellerData?._id) {
        const productsRes = await axios.get(
          `${url}/api/product/getAllProductsBySeller/${sellerData._id}`,
          { withCredentials: true }
        );
        setProductCount(productsRes.data?.products?.length || 0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login to view seller dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerData();
  }, []);

  return (
    <div className='min-h-screen bg-white px-4 md:px-10 py-10 mt-20'>

      {loading ? (
        <div className='text-lg font-medium'>Loading...</div>
      ) : (
        <>
          <h1 className='text-3xl font-bold mb-1'>Welcome, {seller?.name || "Seller"}</h1>
          <p className='text-gray-500 mb-8'>{seller?.email}</p>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10'>
            <div className='rounded-2xl p-5 shadow-md border'>
              <h2 className='text-2xl font-bold'>{productCount}</h2>
              <p className='text-gray-500 text-sm'>Your Products</p>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div
              onClick={() => navigate('/seller/products')}
              className='cursor-pointer rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-medium'
            >
              Manage My Products
            </div>
            <div
              onClick={() => navigate('/seller/products?add=true')}
              className='cursor-pointer rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-medium bg-black text-white'
            >
              + Add New Product
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default SellerDashboard