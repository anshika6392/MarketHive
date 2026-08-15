import express from 'express'
import { createOrder, verifyPayment } from '../controller/razorPayController.js';
import { verify } from 'crypto';
import protect from '../middlewares/authMiddleWare.js'
const Router = express.Router();

Router.post("/create-order", createOrder);
Router.post("/verify-payment",protect,verifyPayment);  // is apiu ke through hm payment ko order model me save  kar rhe h 


export default Router


