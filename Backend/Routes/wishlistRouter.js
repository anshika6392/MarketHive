import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controller/wishlistController.js';
import protect from '../middlewares/authMiddleWare.js';

const Router = express.Router();
Router.post('/addToWishlist/:productId', protect, addToWishlist);
Router.delete('/removeFromWishlist/:productId', protect, removeFromWishlist);
Router.get('/getWishlist', protect, getWishlist);

export default Router;