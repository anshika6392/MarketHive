import express from 'express';
import{ addToCart }from '../controller/cartController.js';
import protect from '../middlewares/authMiddleWare.js';

const Router=express.Router();

Router.post('/addToCart/:productId',protect,addToCart);

export default Router;

