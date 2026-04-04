import jwt from 'jsonwebtoken'

const generateToken=(id)=>{
    console.log(process.env.MY_SECRET)
    return jwt.sign({id},"Anshika@1234",{expiresIn:"7d"});
}

export default generateToken;