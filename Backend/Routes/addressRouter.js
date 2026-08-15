import express from 'express'
import { addAddress, getAddressByUser } from '../controller/addressController.js';
import protect from '../middlewares/authMiddleWare.js';

const Router=express.Router();


Router.post('/addAddress',protect, addAddress);
Router.get('/getAddressByUser',protect,getAddressByUser);

export default Router