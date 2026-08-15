import express from 'express';
import{ addToCart, decreaseItemInCart, deleteItemFromCart, getCartData }from '../controller/cartController.js';
import protect from '../middlewares/authMiddleWare.js';

const Router=express.Router();

Router.post('/addToCart/:productId',protect,addToCart);
Router.delete('/deleteItem/:productId',protect,deleteItemFromCart);
Router.get('/getCartData/',protect,getCartData);
Router.post('/decreaseItem/:productId', protect, decreaseItemInCart);

export default Router;

