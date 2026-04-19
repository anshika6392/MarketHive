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

