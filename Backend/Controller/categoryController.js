import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {

    try {

        if (req.requester.type != "admin") {
            return res.status(401).json({ message: "Not Authorised to create Category" })
        }

        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(404).json({ message: "fill all the fields" });
        }

        const data = await categoryModel.create({
            name: name,
            description: description
        });
        return res.status(201).json({ message: "category created", data });
    } catch (error) {
        return res.status(501).json({ message: "Failed to create Category", error });
    }

}

export const deleteCategory = async (req, res) => {

    try {

        const { categoryId } = req.params;

        if (req.requester.type != "admin") {
            return res.status(401).json({ message: "not authorised to delete category" })
        }

        const data = await categoryModel.findByIdAndDelete(categoryId);
        return res.status(410).json({ message: "category deleted", data });

    } catch (error) {
        return res.status(501).json({ message: "unable to delete", error });
    }
}

export const getAllCategory = async (req, res) => {
    try {

        const data = await categoryModel.find();
        return res.status(200).json({message:"category fetched",data});


    } catch (error) {
     return res.stataus(501).json({message:"failed to fetch category"});
    }
}