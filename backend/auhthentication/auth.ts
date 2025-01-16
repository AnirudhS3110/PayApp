import z from "zod";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response, Router } from "express";

const secretPass = "S3cret";
const firstNameSchema = z.string().min(1);
const lastNameSchema = z.string().min(1);
const phoneNumberSchema = z.number().gte(10).lte(10).nonnegative();
const passwordSchema = z.string().min(8).max(20);
const userNameSchema = z.string().min(6).max(40);

export function isvalidUserName(req: Request, res: Response , next:NextFunction):any{
    try{
        const result = userNameSchema.safeParse(req.body.userName);
        if(!result.success)
        {
            return res.json({message:"invalid username", success:false})
        }
        next();
    }catch(e)
    {
        return res.status(500).json({message:"Internal server error", success:false})
    }
}

export function isvalidFirstName(req: Request, res: Response , next:NextFunction):any{
    try{
        const result = firstNameSchema.safeParse(req.body.firstName);
        if(!result.success)
        {
            return res.json({message:"invalid First Name", success:false})
        }
        next();
    }catch(e)
    {
        return res.status(500).json({message:"Internal server error", success:false})
    }
}

export function isvalidLastName(req: Request, res: Response , next:NextFunction):any{
    try{
        const result = lastNameSchema.safeParse(req.body.lastName);
        if(!result.success)
        {
            return res.json({message:"invalid last name", success:false})
        }
        next();
    }catch(e)
    {
        return res.status(500).json({message:"Internal server error", success:false})
    }
}

export function isvalidPhoneNumber(req: Request, res: Response , next:NextFunction):any{
    try{
        const result = phoneNumberSchema.safeParse(req.body.phoneNumber);
        if(!result.success)
        {
            return res.json({message:"invalid phone number", success:false})
        }
        next();
    }catch(e)
    {
        return res.status(500).json({message:"Internal server error", success:false})
    }
}

export function isvalidPassword(req: Request, res: Response , next:NextFunction):any{
    try{
        const result = passwordSchema.safeParse(req.body.password);
        if(!result.success)
        {
            return res.json({message:"invalid password", success:false})
        }
        next();
    }catch(e)
    {
        return res.status(500).json({message:"Internal server error", success:false})
    }
}

export function jwtAuthentication(req: Request, res: Response , next:NextFunction):any {
    const token = req.headers.authorization;
    if(!token)
        return res.json({message:"Token unaivalable", success:false});

    try{
        const payload = jwt.verify(token,secretPass);
        req.body.payload = payload;
        next();
    }
    catch(e)
    {
        return res.json({message:"Invalid Token", success:false})
    }
}

