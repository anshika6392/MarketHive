import express from 'express'
import { createProduct, deleteManyProducts, deleteProduct, getAllProducts, getAllProductsBySeller, getRandomProducts, updateProduct } from '../controller/productController.js'
import protect from '../middlewares/authMiddleWare.js';
import upload from '../middlewares/multer.js';

const Router = express.Router();



Router.post('/addProduct', upload.array('files', 5), protect, createProduct);
Router.delete('/deleteProduct/:productId', protect, deleteProduct);
Router.delete('/deleteManyProducts', protect, deleteManyProducts); // delete many products at once
Router.get('/getAllProducts', getAllProducts);
Router.get('/getAllProductsBySeller/:sellerId', protect, getAllProductsBySeller);
Router.put('/updateProduct/:productId', protect, updateProduct);
Router.get('/getRandomProducts', getRandomProducts);

export default Router;