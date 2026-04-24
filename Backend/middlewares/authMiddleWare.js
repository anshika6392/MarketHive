import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
    let token;

    // 1️⃣ Check Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {  // most imp for interviews
        console.log("Bearer Token Found")
        token = req.headers.authorization.split(" ")[1];
    }

    // 2 req.cookies se token lena

    if (!token && req.cookies.session_Token) {  //most most imp
        console.log("cookie found");
        token = req.cookies.session_Token;
    }


    // 3️⃣ If no token
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // 4️⃣ Verify Token
        const decoded = jwt.verify(token, "Anshika@1234"); //it will dehash toekn and return a object which wil contain userId,token created date,expiry date

        // 5️⃣ Get user from DB (without password)
        req.requester = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }

}

export default protect;