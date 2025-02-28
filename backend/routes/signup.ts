import { NextFunction, Request, Response, Router } from "express";
import bcrypt from "bcrypt"
import { Accounts, Users } from "../db/db";
import { isvalidFirstName, isvalidLastName, isvalidPassword, isvalidPhoneNumber, isvalidUserName } from "../auhthentication/auth";
const router = Router();


async function getHashedPass(pass:string): Promise<string>
{
    try{
        const hashed = await bcrypt.hash(pass,10);
        return hashed;

    }
    catch(e)
    {
        throw(e);
    }
}

  interface signupBody{
    userName: string,
    firstName: string,
    lastName: string,
    phoneNumber:number,
    password: string
}

router.post('/signup',isvalidUserName, isvalidFirstName, isvalidLastName , isvalidPhoneNumber, isvalidPassword, async(req:Request<{},{},signupBody>, res:Response , next:NextFunction):Promise <any>=>{
  const {userName,firstName,lastName,phoneNumber,password} = req.body;
  console.log("Came into signup router")
  
  try{
    const hashedPass = await getHashedPass(password);
    const user = await Users.findOne({phoneNumber:phoneNumber})
    if(user)
        return res.json({success:false, message:"iuser with the phone number already exists"})
    const newUser = await Users.create({userName,firstName,lastName,phoneNumber,password:hashedPass});
    const newAccount =await Accounts.create({id:newUser._id, balance:10000});
    return res.status(200).json({success:true, message:"user created!"})

  }
  catch(e)
  {
    return res.status(500).json({success:false, message:"internal Server error"})
  }
})

export default router;