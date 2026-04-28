import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Cart = () => {

  const url = import.meta.env.VITE_URL;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCartData = async () => {
    try {

      const response = await axios.get(`${url}/api/cart/getCartData`, { withCredentials: true });
      console.log(response.data);
      setCartItems(response.data.cart.items || []);

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  const increseItemInCart=async(productId)=>{
    try {
      await axios.post(`${url}/api/cart/addToCart/${productId}`,{},{withCredentials:true});
      getCartData();
      toast.success("quantity Incresed");
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCartData();
  }, [])


  // total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );



  return (
    <div className='min-h-screen bg-white px-4 md:px-10 py-10 mt-20 '>

      <h1 className='text-3xl font-bold mb-8'>
        Shopping Cart
      </h1>


      {
        loading ? (

          <div className='text-lg font-medium'>
            Loading...
          </div>

        ) : cartItems.length === 0 ? (

          <div className='flex flex-col items-center justify-center mt-24'>

            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty-cart"
              className='w-40 mb-5'
            />

            <h2 className='text-2xl font-semibold mb-2'>
              Your cart is empty
            </h2>

            <p className='text-gray-500'>
              Add some products to your cart
            </p>

          </div>

        ) : (

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>


            {/* LEFT SIDE */}
            <div className='lg:col-span-2 space-y-5'>

              {
                cartItems.map((item, index) => (

                  <div
                    key={index}
                    className='border rounded-2xl p-4 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-md transition'
                  >

                    {/* IMAGE */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className='w-full sm:w-36 h-36 object-cover rounded-xl'
                    />


                    {/* DETAILS */}
                    <div className='flex-1 flex flex-col justify-between'>

                      <div>

                        <h2 className='text-xl font-semibold'>
                          {item.name}
                        </h2>

                        <p className='text-gray-500 text-sm mt-1'>
                          {item.description}
                        </p>

                      </div>


                      <div className='flex items-center justify-between mt-5 flex-wrap gap-3'>

                        <div className='flex items-center gap-3'>

                          <button className='bg-gray-200 px-3 py-1 rounded-lg text-lg'onClick={()=>{}}>
                            -
                          </button>

                          <span className='font-medium'>
                            {item.quantity}
                          </span>

                          <button className='bg-black text-white px-3 py-1 rounded-lg text-lg' onClick={()=>increseItemInCart(item.product)}>
                            +
                          </button>

                        </div>


                        <div className='text-xl font-bold'>
                          ₹ {item.price}
                        </div>

                      </div>

                    </div>

                  </div>

                ))
              }

            </div>



            {/* RIGHT SIDE */}
            <div className='border rounded-2xl p-6 shadow-sm h-fit'>

              <h2 className='text-2xl font-bold mb-6'>
                Order Summary
              </h2>


              <div className='space-y-4'>

                <div className='flex justify-between text-gray-600'>
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className='flex justify-between text-gray-600'>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <hr />

                <div className='flex justify-between text-2xl font-bold'>
                  <span>Total</span>
                  <span>₹ {totalPrice}</span>
                </div>

              </div>


              <button className='w-full bg-black text-white py-3 rounded-xl mt-8 hover:bg-gray-800 transition'>
                Proceed To Checkout
              </button>

            </div>

          </div>

        )
      }

    </div>
  )
}

export default Cart