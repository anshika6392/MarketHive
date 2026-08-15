import Axios from "axios";
import React, { useEffect, useState } from "react";

const OrderDetails = () => {
  const url = import.meta.env.VITE_URL;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await Axios.get(
        `${url}/api/Order/getOrderByUser`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.order);

      setOrders(response.data.order || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-24 p-5">
      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-10 text-center">
          <div className="text-6xl mb-3">📦</div>

          <h2 className="text-2xl font-semibold">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-2">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow rounded-lg p-5 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">
                  Order ID: {order._id}
                </p>

                <p className="text-gray-500 text-sm">
                  Ordered On:{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>

                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                  {order.orderStatus}
                </span>
              </div>
            </div>

            {order.products.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row gap-5 border-t pt-4 mt-4"
              >
                <img
                  src={
                    item?.productId?.images?.[0]?.url
                  }
                  alt={item?.productId?.name}
                  className="w-32 h-32 object-cover rounded border"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {item?.productId?.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {item?.productId?.description}
                  </p>

                  <div className="mt-3 space-y-1">
                    <p>
                      Quantity:{" "}
                      <span className="font-medium">
                        {item.quantity}
                      </span>
                    </p>

                    <p>
                      Price:{" "}
                      <span className="font-medium">
                        ₹{item.price}
                      </span>
                    </p>

                    <p>
                      Product Total:{" "}
                      <span className="font-medium">
                        ₹
                        {item.price *
                          item.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t mt-5 pt-4 flex justify-between items-center">
              <div>
                <p className="text-gray-500">
                  Payment Method:
                  <span className="font-medium ml-2">
                    {order.paymentMethod}
                  </span>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Total: ₹
                  {order.totalAmount}
                </h2>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetails;