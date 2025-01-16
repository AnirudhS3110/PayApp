import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken"
import { Users } from "../db/db";
import { isvalidFirstName, isvalidLastName, isvalidPassword, isvalidPhoneNumber, isvalidUserName } from "../auhthentication/auth";


const secretPass = "S3cret";
const router = Router();

router.get('/signin',isvalidUserName, isvalidFirstName, isvalidLastName , isvalidPhoneNumber, isvalidPassword, async(req: Request, res: Response , next:NextFunction):Promise <any>=>{
    const phoneNumber = req.body.phoneNumber;

    try{
        const user = await Users.findOne({phoneNumber:phoneNumber})       
        if(!user)
            return res.json({success:false, message:"Invalid phone number"})

        const token = jwt.sign(phoneNumber,secretPass,{expiresIn:"2h"});
        return res.json({success:true, token:token, message:"Token created succesfully!"})
    }
    catch(e)
    {
        res.json({success:false , message: "Internal serever error"})
    }
})

export default router;