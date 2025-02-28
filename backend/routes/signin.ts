import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken"
import { Users } from "../db/db";
import { isvalidFirstName, isvalidLastName, isvalidPassword, isvalidPhoneNumber, isvalidUserName } from "../auhthentication/auth";


const secretPass = "S3cret";
const router = Router();

router.post('/signin', isvalidPhoneNumber, isvalidPassword, async(req: Request, res: Response , next:NextFunction):Promise <any>=>{
    const phoneNumber = req.body.phoneNumber;

    try{
        console.log("into the try of signin")
        const user = await Users.findOne({phoneNumber:phoneNumber})       
        if(!user)
            return res.json({success:false, message:"Invalid phone number"})
        console.log(user)
        const token = jwt.sign({phoneNumber},secretPass,{expiresIn:"2h"});
        return res.json({success:true, token:token, message:"Token created succesfully!"})
    }
    catch(e)
    {
        res.json({success:false , message: "Internal serever error in generating token"})
    }
})

export default router;