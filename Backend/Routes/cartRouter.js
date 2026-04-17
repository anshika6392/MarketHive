import express from 'express';
import{ addToCart, deleteItem }from '../controller/cartController.js';
import protect from '../middlewares/authMiddleWare.js';

const Router=express.Router();

Router.post('/addToCart/:productId',protect,addToCart);
Router.delete('/deleteItem/:productId',protect,deleteItem);

export default Router;

