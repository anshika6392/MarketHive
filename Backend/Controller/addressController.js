import Address from "../models/addressModel.js";

export const addAddress = async (req, res) => {
   const { houseName, area, name, mobile, alternateMobile, addressType } = req.body;

   if (!houseName || !area || !name || !mobile || !addressType) {
      return res.status(400).json({ message: "fill all the fields" });
   }

   try {

      const data = await Address.create({
         houseName,
         area,
         name,
         mobile,
         alternateMobile,
         addressType,
         user: req.requester._id
      })

      res.status(200).json({
         message: "Address added successfully",
         data
      });
   } catch (error) {
      res.status(500).json({ message: "Something Went Wrong", error });

   }















}

export const getAddressByUser = async (req, res) => {
   try {

      const data = await Address.find({ user: req.requester._id });

      if(!data){

         return res.status(200).json({ message: "No address found for user"});
      }

      return res.status(200).json({ message: "address fetched successfully", data });

   } catch (error) {
      res.status(500).json({ message: "Something Went Wrong", error });
   }
}