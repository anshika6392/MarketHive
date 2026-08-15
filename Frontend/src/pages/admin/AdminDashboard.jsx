import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [usersRes, productsRes, categoriesRes] = await Promise.all([
        axios.get(`${url}/api/user/getAllUser`, { withCredentials: true }),
        axios.get(`${url}/api/product/getAllProducts`),
        axios.get(`${url}/api/category/getAllCategories`),
      ]);

      const users = usersRes.data || [];
      const sellers = users.filter((u) => u.type === "seller");

      setStats({
        totalUsers: users.length,
        totalSellers: sellers.length,
        totalProducts: productsRes.data?.products?.length || 0,
        totalCategories: categoriesRes.data?.data?.length || 0,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Users", value: stats.totalUsers, color: "bg-blue-500" },
    { label: "Total Sellers", value: stats.totalSellers, color: "bg-green-500" },
    { label: "Total Products", value: stats.totalProducts, color: "bg-purple-500" },
    { label: "Total Categories", value: stats.totalCategories, color: "bg-orange-500" },
  ];

  const quickLinks = [
    { label: "Manage Sellers", path: "/admin/manageSellers" },
    { label: "Manage Users", path: "/getAllUsers" },
    { label: "All Products", path: "/allProducts" },
  ];

  return (
    <div className='min-h-screen bg-white px-4 md:px-10 py-10 mt-20'>

      <h1 className='text-3xl font-bold mb-2'>Admin Dashboard</h1>
      <p className='text-gray-500 mb-8'>Overview of the entire marketplace</p>

      {loading ? (
        <div className='text-lg font-medium'>Loading...</div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10'>
            {cards.map((c, i) => (
              <div key={i} className='rounded-2xl p-5 shadow-md border'>
                <div className={`w-10 h-10 rounded-lg ${c.color} mb-3`} />
                <h2 className='text-2xl font-bold'>{c.value}</h2>
                <p className='text-gray-500 text-sm'>{c.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            {quickLinks.map((link, i) => (
              <div
                key={i}
                onClick={() => navigate(link.path)}
                className='cursor-pointer rounded-2xl p-6 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center font-medium'
              >
                {link.label}
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  )
}

export default AdminDashboard