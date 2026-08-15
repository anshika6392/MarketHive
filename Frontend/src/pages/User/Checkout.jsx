import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [address, setAddress] = useState({ fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    try {
      await axios.post(`${url}/api/order/createOrder`, { shippingAddress: address, paymentMethod }, { withCredentials: true });
      toast.success("Order placed successfully");
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to place order");
    }
  }

  return (
    <div className='min-h-screen bg-white px-4 md:px-10 py-10 mt-20'>
      <h1 className='text-3xl font-bold mb-8'>Checkout</h1>
      <div className='max-w-xl space-y-4'>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full border p-3 rounded-lg" />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full border p-3 rounded-lg" />
        <input name="addressLine" placeholder="Address" onChange={handleChange} className="w-full border p-3 rounded-lg" />
        <input name="city" placeholder="City" onChange={handleChange} className="w-full border p-3 rounded-lg" />
        <input name="state" placeholder="State" onChange={handleChange} className="w-full border p-3 rounded-lg" />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} className="w-full border p-3 rounded-lg" />
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border p-3 rounded-lg">
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment</option>
        </select>
        <button onClick={placeOrder} className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">Place Order</button>
      </div>
    </div>
  )
}
export default Checkout