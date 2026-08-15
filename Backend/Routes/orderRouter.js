import express from 'express'
import {getOrderByUser} from '../controller/orderController.js'
import protect from '../middlewares/authMiddleWare.js';
const Router = express.Router();

Router.get('/getOrderByUser',protect, getOrderByUser);

export default Router;