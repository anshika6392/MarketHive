import User from "../models/userModel.js"

export const addUser = async (req, res) => {
    try {
        let { type } = req.body || {};

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(501).json({ message: "Missing Required Fields" });
        }

        const count = await User.estimatedDocumentCount();

        if (count == 0) {
            type: "admin"
        }

        console.log("count is - > ", count);

        const user = await User.create({
            name,
            email,
            password,
            type
        }
        );

        res.status(201).json({ message: "user created", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("error aa rhi h : ", error);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getSpecificUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
        console.log("fail");
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            console.log("user is already deleted");
            return res.status(400).json({ message: "user is already deleted" });
        }
        console.log("there is error");

        res.status(200).json({ message: "user is deleted;" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findById(id);
        if (!User) {
            return res.status(400).json({ message: "user not found" });
        }
        const { name, email, password, profilepic, type } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) updateData.password = password;
        if (profilepic) updateData.profilepic = profilepic;
        if (type) updateData.type = type;

        const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedData },
            { new: true });

        res.status(200).json({ message: "user updated successfully" });

    } catch (error) {
        res.status(400).json({ message: message.error });
    }
}

