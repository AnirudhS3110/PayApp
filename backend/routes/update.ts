import { NextFunction, Request, Response, Router } from "express";
import { Users } from "../db/db";
const router = Router();

router.put('/update',async(req: Request, res: Response , next:NextFunction):Promise <any>=>{
    
})

export default router;