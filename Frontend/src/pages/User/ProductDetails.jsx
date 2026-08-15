import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'


const ProductDetails = () => {


  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;
  const { productId } = useParams(); // productId ko url se nikaalte the

  const [productData, setProductData] = useState(null); //to set all the details of product
  const [mainImg, setMainImg] = useState(""); // setting the main image
  const [productsCategoryWise, setProductsCategoryWise] = useState([]);
  // const [categoryId, setCategoryId] = useState(""); //to set the category of current page


  const getProductById = async () => {
    try {
      const response = await axios.get(`${url}/api/product/getProductById/${productId}`);
      setProductData(response.data.data);
      setMainImg(response.data.data?.images?.[0].url);
      // setCategoryId(response.data.data.category); // extracting categoryId from our response
      fetchProductBYCategory(response.data.data.category);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductById()
    // fetchProductBYCategory()   // is trh call karne pe hamare doni functions sath me call ho jaa rhe the jis se hame category Id nhi mil paa rhi thi
  }, [productId]);


  // getting all related products of current produts category
  const fetchProductBYCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${url}/api/product/getProductByCategory/${categoryId}`);
      setProductsCategoryWise(response.data.data)
    } catch (error) {
      toast.error("no related items");
      console.log(error);
    }

  }

  // Add to cart item from product detail page
  const addToCart = async () => {
    try {
      // post request=url,body,cookie
      const response = await axios.post(`${url}/api/cart/addToCart/${productId}`, {}, { withCredentials: "true" });
      toast.success("product addedd to cart");
    } catch (error) {
      console.log(error);
      toast.error("failed");
    }
  }


  return (

    <div className='bg-white text-black px-6 py-12 mt-26'>


      {/* main product details */}
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12'>

        {/* LEFT SIDE IMAGE */}

        <div className='bg-gray-100 rounded-2xl p-6 flex items-center justify-center shadow-md'>

          <div className='flex flex-col gap-4'>

            {/* Main Image */}

            <img
              src={mainImg}
              alt=""
              className='w-full max-w-md h-[400px] object-contain rounded-xl border'
            />

            {/* Small Images */}

            <div className='flex gap-3 flex-wrap'>

              {
                productData?.images?.map((images, index) => (
                  <img
                    key={index}
                    src={images.url}
                    alt=""
                    className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${images.url === mainImg ? "border-blue-500 border-2" : ""}`}
                    onClick={() => setMainImg(images.url)}
                  />
                ))
              }

            </div>

          </div>

        </div>

        {/* RIGHT SIDE DETAILS */}

        <div className='flex flex-col justify-center'>

          <h1 className='text-4xl font-bold mb-4'>
            {productData?.name}
          </h1>

          <p className='text-gray-600 text-lg leading-relaxed mb-6'>
            {productData?.description}
          </p>

          <h2 className='text-3xl font-semibold mb-6 text-green-600'>
            ₹ {productData?.price}
          </h2>

          <div className='flex gap-4'>

            <button className='bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300' onClick={addToCart}>
              Add To Cart
            </button>

            <button
              className='border-2 border-black px-8 py-3 rounded-xl hover:bg-black hover:text-white transition-all duration-300'
              onClick={() => navigate(`/BuyNow/${productData._id}`)}
            >

              Buy Now
            </button>

          </div>

        </div>

      </div>


      {/* Simmilar product list */}

      <h1 className='text-2xl font-bold mt-10'>Recommended Products : </h1>
      <div className="w-full flex justify-center px-3 sm:px-6 mt-10">

        <div className="w-full max-w-[1400px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6" >

          {productsCategoryWise?.map((p, i) => {
            return (
              <div>
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg hover:scale-105 transition-all duration-300 flex flex-col justify-between "
                >
                  {/* Image */}
                  <div className="relative h-[140px] sm:h-[160px] md:h-[180px] w-full overflow-hidden">
                    <img
                      src={p?.images[0]?.url}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 flex flex-col gap-2 flex-grow">
                    <h1 className="text-xs sm:text-sm font-semibold line-clamp-2">
                      {p.name}
                    </h1>

                    <h2 className="text-sm sm:text-lg font-bold text-green-600">
                      ₹{p.price}
                    </h2>

                    <p className="text-[10px] sm:text-xs text-gray-600 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="p-3 pt-0">
                    <button
                      className="w-full py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white text-xs sm:text-sm font-medium hover:from-green-600 hover:to-green-700 transition"
                      onClick={() => navigate(`/productDetails/${p._id}`)}
                    >
                      Buy Now
                    </button>
                  </div>

                </div>
              </div>)
          })}
        </div>
      </div>

    </div>
  )
}

export default ProductDetails