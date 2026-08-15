import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './pages/User/Home';
import Login from './auth/Login';
import SignUp from "./auth/SignUp";
import ProductDetails from './pages/User/ProductDetails';
import Cart from './pages/User/Cart';
import GetAllUser from "./pages/admin/GetAllUser";
import GetAllProduct from "./pages/User/AllProducts";
import CategoryWisePage from "./pages/User/CategoryWisePage";
import BuyNow from "./pages/User/BuyNow";
import OrderDetails from "./pages/User/OrderDetails";
import SellerLogin from "./pages/seller/SellerLogin";
import Checkout from "./pages/User/Checkout";

const App = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/login' element={<Login></Login>} />
      <Route path='/signIn' element={<SignUp></SignUp>} />
      <Route path='/cart' element={<Cart></Cart>} />
      <Route path='/productDetails/:productId' element={<ProductDetails></ProductDetails>} />
      <Route path='/getAllUsers' element={<GetAllUser></GetAllUser>} />
      <Route path='/allProducts' element={<GetAllProduct></GetAllProduct>} />
      <Route path='/categoryWisePage' element={<CategoryWisePage></CategoryWisePage>} />
      <Route path='/buyNow/:productId' element={<BuyNow></BuyNow>} />
      <Route path='/order' element={<OrderDetails></OrderDetails>} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/seller/login' element={<SellerLogin></SellerLogin >} />


    </Routes>
    // </BrowserRouter>
  )
}

export default App

