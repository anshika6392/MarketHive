import express from 'express'
import { createProduct, deleteManyProducts, deleteProduct, getAllProducts, getAllProductsBySeller, updateProduct } from '../controller/productController.js'
import protect from '../middlewares/authMiddleWare.js';

const Router = express.Router();



Router.post('/addProduct', protect, createProduct);
Router.delete('/deleteProduct/:productId', protect, deleteProduct);
Router.delete('/deleteManyProducts', protect, deleteManyProducts); // delete many products at once
Router.get('/getAllProducts', getAllProducts);
Router.get('/getAllProductsBySeller/:sellerId', protect, getAllProductsBySeller);
Router.put('/updateProduct/:productId', protect, updateProduct);

export default Router;