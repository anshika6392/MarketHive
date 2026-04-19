import express from "express";
import Category from "../models/categoryModel.js";
import protect from "../middlewares/authMiddleWare.js";
import { createCategory, deleteCategory, getAllCategory } from "../controller/categoryController.js";

const router = express.Router();

// // create category
// router.post("/", async (req, res) => {
//     const { name, description } = req.body;

//     const category = new Category({ name, description });
//     await category.save();

//     res.json(category);
// });

// // get all categories
// router.get("/", async (req, res) => {
//     const categories = await Category.find();
//     res.json(categories);
// });


router.post('/createCategory', protect, createCategory);
router.delete('/deleteCategory/:categoryId',protect,deleteCategory);
router.get('/getAllCategories',getAllCategory);
export default router;