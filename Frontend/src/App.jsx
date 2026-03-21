import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from './pages/Home';
import Login from './auth/Login';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SignUp from "./auth/SignUp";
import GetAllUser from "./pages/GetAllUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Home></Home>} />
        <Route  path='/login' element={<Login></Login>} />
        <Route  path='/SignUp' element={<SignUp></SignUp>}/>
        <Route  path='/Cart' element= {<Cart></Cart>}/>
        <Route  path='/productDetails' element={<ProductDetails></ProductDetails>} />
        <Route  path='/register' element={<Register></Register>} />
        <Route  path='/checkout' element ={<Checkout></Checkout>} />
        <Route  path='/getAllUsers' element ={<GetAllUser></GetAllUser>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App

