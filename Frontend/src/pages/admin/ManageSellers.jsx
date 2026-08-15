import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageSellers = () => {
  const url = import.meta.env.VITE_URL;

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/getAllUser`, { withCredentials: true });
      const allUsers = response.data || [];
      setSellers(allUsers.filter((u) => u.type === "seller"));
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch sellers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/user/deleteUser`, {
        data: { id },
        withCredentials: true,
      });
      toast.success("Seller removed");
      setSellers((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove seller");
    }
  };

  return (
    <div className='min-h-screen bg-white px-4 md:px-10 py-10 mt-20'>

      <h1 className='text-3xl font-bold mb-8'>Manage Sellers</h1>

      {loading ? (
        <div className='text-lg font-medium'>Loading...</div>
      ) : sellers.length === 0 ? (
        <div className='text-gray-500'>No sellers found</div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-100 text-left'>
                <th className='p-3'>Name</th>
                <th className='p-3'>Email</th>
                <th className='p-3'>Joined</th>
                <th className='p-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((s) => (
                <tr key={s._id} className='border-b hover:bg-gray-50'>
                  <td className='p-3'>{s.name}</td>
                  <td className='p-3'>{s.email}</td>
                  <td className='p-3'>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className='p-3'>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className='px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition'
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

export default ManageSellers