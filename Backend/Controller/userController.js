import User from "../models/userModel.js"
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
    try {

        const { name, email, password ,type} = req.body;
        if (!name || !email || !password) {
            return res.status(501).json({ message: "Missing Required Fields" });
        }

        if(type=="admin"){
            return res.status(403).json({Error:"Not Authorized to Become Admin"});
        }
      
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

// export const login = async (req, res) => {
//     const {email,password}=req.body;

//     const user=await User.findOne({email});

//     if(!user){
//         res.status(404);
//         return res.json({message:"User doesn't exist in DB"})
//     }

//     if(user.password == password){
//         return res.status(200).json({messagew:"Login done"})
//     }
//     else{
//         return res.status(401).json("Wrong Password");
//     }
// }


export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    //   if(user.password==password){
    //     return res.status(200).json({message:"user login successfully"})
    //   }
    //   else{
    //     return res.status(401).json({message:"wrong password"})
    //   }

    const p = await user.matchPassword(password);
    if (!p) {
        return res.status(401).json({ message: "wrong password" });
    }
    else {
        console.log("login ho gayaaa...");
        return res.status(200).json({ message: "user login successfully" });
    }
}