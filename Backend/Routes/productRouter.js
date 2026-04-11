import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getAllProductsBySeller } from '../controller/productController.js'
import protect from '../middlewares/authMiddleWare.js';

const Router=express.Router();



Router.post('/addProduct',protect,createProduct);
Router.delete('/deleteProduct/:productId',protect,deleteProduct);
Router.get('/getAllProducts',getAllProducts);
Router.get('/getAllProductsBySeller/:sellerId',protect,getAllProductsBySeller);

export default Router;