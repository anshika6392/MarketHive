import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const SellerProducts = () => {
  const url = import.meta.env.VITE_URL;

  const [sellerId, setSellerId] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "",
  });
  const [files, setFiles] = useState([]);

  const fetchSellerId = async () => {
    try {
      const res = await axios.post(`${url}/api/user/checkLogin`, {}, { withCredentials: true });
      const id = res.data?.user?._id;
      setSellerId(id);
      return id;
    } catch (error) {
      toast.error("Login to manage products");
      return null;
    }
  };

  const fetchProducts = async (id) => {
    try {
      const res = await axios.get(`${url}/api/product/getAllProductsBySeller/${id}`, { withCredentials: true });
      setProducts(res.data?.products || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch your products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${url}/api/category/getAllCategories`);
      setCategories(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const init = async () => {
    setLoading(true);
    const id = await fetchSellerId();
    if (id) await fetchProducts(id);
    await fetchCategories();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price || !form.category) {
      return toast.error("Fill all the fields");
    }
    if (files.length === 0) {
      return toast.error("Select at least one product image");
    }

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      Array.from(files).forEach((file) => data.append("files", file));

      await axios.post(`${url}/api/product/addProduct`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully");
      setForm({ name: "", description: "", price: "", category: "" });
      setFiles([]);
      setShowForm(false);
      fetchProducts(sellerId);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add product");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${url}/api/product/deleteProduct/${productId}`, { withCredentials: true });
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className='min-h-screen bg-white px-4 md:px-10 py-10 mt-20'>

      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>My Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className='px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition'
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <form onSubmit={handleAddProduct} className='border rounded-2xl p-6 mb-10 space-y-4 max-w-xl'>
          <input
            name="name" placeholder="Product Name" value={form.name}
            onChange={handleChange} className='w-full border p-3 rounded-lg'
          />
          <textarea
            name="description" placeholder="Description" value={form.description}
            onChange={handleChange} className='w-full border p-3 rounded-lg'
          />
          <input
            name="price" type="number" placeholder="Price" value={form.price}
            onChange={handleChange} className='w-full border p-3 rounded-lg'
          />
          <select
            name="category" value={form.category} onChange={handleChange}
            className='w-full border p-3 rounded-lg bg-white'
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <input
            type="file" multiple accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className='w-full border p-3 rounded-lg'
          />
          <button type="submit" className='w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition'>
            Save Product
          </button>
        </form>
      )}

      {/* Products List */}
      {loading ? (
        <div className='text-lg font-medium'>Loading...</div>
      ) : products.length === 0 ? (
        <div className='text-gray-500'>You haven't added any products yet</div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {products.map((p) => (
            <div key={p._id} className='rounded-2xl overflow-hidden border shadow-md flex flex-col'>
              <div className='h-[160px] bg-gray-100'>
                <img src={p?.images?.[0]?.url} alt={p.name} className='w-full h-full object-cover' />
              </div>
              <div className='p-4 flex flex-col flex-grow'>
                <h2 className='font-semibold text-sm line-clamp-2'>{p.name}</h2>
                <p className='text-green-600 font-bold mt-2'>₹{p.price}</p>
                <button
                  onClick={() => handleDelete(p._id)}
                  className='mt-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default SellerProducts