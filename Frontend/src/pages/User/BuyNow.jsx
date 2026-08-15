import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BuyNow = () => {
  const url = import.meta.env.VITE_URL;
  const { productId } = useParams();

  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [addressData, setAddressData] = useState({
    houseName: "",
    area: "",
    name: "",
    mobile: "",
    alternateMobile: "",
    addressType: "home",
  });

  // Fetch Addresses
  const handleAddress = async () => {
    try {
      const response = await Axios.get(
        `${url}/api/address/getAddressByUser`,
        {
          withCredentials: true,
        }
      );

      setAddress(response.data.data);

      if (response.data.data.length > 0) {
        setSelectedAddress(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Product
  const handleProduct = async () => {
    try {
      const response = await Axios.get(
        `${url}/api/product/getProductById/${productId}`
      );

      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Input Change
  const handleChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Address
  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        `${url}/api/address/addAddress`,
        addressData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      setShowAddressForm(false);

      setAddressData({
        houseName: "",
        area: "",
        name: "",
        mobile: "",
        alternateMobile: "",
        addressType: "home",
      });

      handleAddress();
    } catch (error) {
      console.log(error);
    }
  };

  // Place Order
  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        alert("Please select an address");
        return;
      }

      const totalPrice = product?.price * quantity;

      // Create Razorpay Order from Backend
      const { data } = await Axios.post(`${url}/api/payment/create-order`,{amount: totalPrice,},{withCredentials: true});

      const order = data.order;

      if (!order) {
        alert("Unable to create payment order");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Market Hive",

        description: "Product Purchase",

        prefill: {
          name: selectedAddress?.name || "",
          contact: selectedAddress?.mobile || "",
        },

        theme: {
          color: "#F97316",
        },

        handler: async function (response) {
          try {
            const verifyResponse = await Axios.post(`${url}/api/payment/verify-payment`,{
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productId: product?._id,
                addressId: selectedAddress?._id,
                quantity,
                totalPrice,
              },
              {
                withCredentials: true,
              }
            );

            if (verifyResponse.data.success) {
              alert("Payment Successful");

              // navigate("/order-success");
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.log(error);
            alert("Verification Error");
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          },
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };


  useEffect(() => {
    handleAddress();
    handleProduct();
  }, []);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5 mt-20">

      {/* Address Section */}
      <div className="bg-white shadow rounded-lg p-5">
        <h1 className="text-xl font-bold mb-4">
          Delivery Address
        </h1>

        {address.length === 0 ? (
          <div className="border rounded-lg p-8 text-center">

            <div className="text-6xl mb-3">
              📍
            </div>

            <h2 className="font-semibold text-lg">
              No Address Added
            </h2>

            <p className="text-gray-500 mt-2">
              Add an address to continue checkout.
            </p>

            <button
              onClick={() => setShowAddressForm(true)}
              className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
            >
              Add Address
            </button>
          </div>
        ) : (
          <>
            {address.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedAddress(item)}
                className={`border rounded-lg p-4 mb-3 cursor-pointer ${selectedAddress?._id === item._id
                  ? "border-green-500 bg-green-50"
                  : ""
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={selectedAddress?._id === item._id}
                    readOnly
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold">
                        {item.name}
                      </h2>

                      <span className="bg-gray-100 px-2 py-1 text-xs rounded">
                        {item.addressType}
                      </span>
                    </div>

                    <p className="text-gray-600">
                      {item.houseName}, {item.area}
                    </p>

                    <p className="text-gray-600">
                      Mobile: {item.mobile}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowAddressForm(true)}
              className="mt-2 text-orange-500 font-semibold"
            >
              + Add New Address
            </button>
          </>
        )}
      </div>

      {/* Product Section */}
      <div className="bg-white shadow rounded-lg p-5 mt-6">
        <div className="flex flex-col md:flex-row gap-6">

          <img
            src={product?.images?.[0]?.url}
            alt={product?.name}
            className="w-56 h-56 object-cover border rounded-lg"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {product?.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {product?.description}
            </p>

            <h3 className="text-2xl font-bold text-green-600 mt-4">
              ₹{product?.price}
            </h3>

            {/* Quantity */}
            <div className="flex items-center gap-4 mt-5">

              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <span className="font-bold text-lg">
                {quantity}
              </span>

              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Total: ₹{product?.price * quantity}
            </h2>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-lg p-5 mt-6">

        <h2 className="text-xl font-bold mb-4">
          Order Summary
        </h2>

        <div className="flex justify-between">
          <span>
            Price ({quantity} item)
          </span>
          <span>
            ₹{product?.price * quantity}
          </span>
        </div>

        <div className="flex justify-between mt-2">
          <span>Delivery Charge</span>
          <span className="text-green-600">
            FREE
          </span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total Amount</span>
          <span>
            ₹{product?.price * quantity}
          </span>
        </div>

        <button
          onClick={placeOrder}
          className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
        >
          Place Order
        </button>
      </div>

      {/* Add Address Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-full max-w-lg p-6 rounded-lg">

            <h2 className="text-xl font-bold mb-4">
              Add New Address
            </h2>

            <form
              onSubmit={handleAddAddress}
              className="space-y-3"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={addressData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={addressData.mobile}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="alternateMobile"
                placeholder="Alternate Mobile"
                value={addressData.alternateMobile}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="houseName"
                placeholder="House / Flat / Building"
                value={addressData.houseName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="area"
                placeholder="Area / Locality"
                value={addressData.area}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <select
                name="addressType"
                value={addressData.addressType}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="home">Home</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddressForm(false)
                  }
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Save Address
                </button>

              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNow;
