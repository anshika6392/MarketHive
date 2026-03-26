import express from "express";
import { addUser, deleteUser, getAllUsers, getSpecificUser, login, updateUser } from "../controller/userController.js";

const Router=express.Router();

Router.post('/addUser',addUser);
Router.get('/getAllUser',getAllUsers);
Router.get('/getSpecific',getSpecificUser);
Router.delete('/deleteUser',deleteUser);
Router.put('/updateUser',updateUser);
Router.post('/login',login);

export default Router;