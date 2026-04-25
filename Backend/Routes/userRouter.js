import express from "express";
import { addUser, checkLogin, deleteUser, getAllUsers, getSpecificUser, login, updateUser } from "../controller/userController.js";
import protect from "../middlewares/authMiddleWare.js";

const Router=express.Router();

Router.post('/addUser',addUser);
Router.get('/getAllUser',protect,getAllUsers);
Router.get('/getSpecific',getSpecificUser);
Router.delete('/deleteUser',protect,deleteUser);
Router.put('/updateUser',protect,updateUser);
Router.post('/login',login);
Router.post('/checkLogin',protect,checkLogin);

Router.post('/testJWT',protect,(req,res)=>{
    return res.status(200).json("test API hitted");
});


Router.post('/test',(req,res)=>{
    console.log(req)
    return res.status(200).json({data:"test"});
});



export default Router;