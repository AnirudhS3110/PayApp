import { NextFunction, Request, Response, Router } from "express";
import { Accounts, IAccounts, IUser, Users } from "../db/db";
import { jwtAuthentication } from "../auhthentication/auth";
import mongoose from "mongoose"
const router = Router();

router.get('/balance',jwtAuthentication, async(req: Request, res: Response , next:NextFunction):Promise <any>=>{
    const phoneNumber = req.body.payload.phoneNumber;

    try{
        const user = await Users.findOne({phoneNumber:phoneNumber}) as IUser;
        const userAccount = await Accounts.findOne({id:user._id}) as IAccounts;
        const balance = userAccount.balance;
        return res.json({success:true, balance: balance , message:"Here is your balance"})
    }catch(e){
        return res.json({success:false, message:"internal Server Error"});
    }

})

router.put('/updatebalance',jwtAuthentication, async(req: Request, res: Response , next:NextFunction):Promise <any>=>{
    const phoneNumber = req.body.payload.phoneNumber;
    const amount = req.body.amount;

    try{
        const user = await Users.findOne({phoneNumber:phoneNumber}) as IUser;
        const userAccount = await Accounts.findOne({id:user._id}) as IAccounts;
        const updatedBal = userAccount.balance + amount;
        const updatedAccount = await Accounts.findOneAndUpdate({id:user._id}, {$set:{balance:updatedBal}}, {new:true});
        if(updatedAccount)
        {
            return res.json({success:true, message:"Money is debitted to yout account" , balance: updatedAccount.balance})
        }
    }catch(e){
        return res.json({success:false, message:"internal Server Error"});
    }

})

router.post('/pay',jwtAuthentication, async(req: Request, res: Response , next:NextFunction):Promise <any>=>{
    const sPhoneNumber = req.body.payload.phoneNumber;
    const rPhoneNumber = req.body.phoneNumber;
    const amount = req.body.amount;

    const session = await mongoose.startSession(); // session starts here

    try{
        const sender = await Users.findOne({phoneNumber:sPhoneNumber} , {session}) as IUser;
        const receiver = await Users.findOne({phoneNumber:rPhoneNumber} , {session}) as IUser;

        const senderAccount = await Accounts.findOne({id:sender._id} , {session}) as IAccounts;
        const receiverAccount = await Accounts.findOne({id:receiver._id} , {session}) as IAccounts;

        if(amount>senderAccount.balance)
            return res.json({message:"Insufficient balance", success:false})

        const updatedBalSender = senderAccount.balance - amount;
        const updatedBalReceiver = receiverAccount.balance + amount;
       

        const updatedSenderAccount = await Accounts.findOneAndUpdate({id:sender._id}, {$set:{balance:updatedBalSender}}, {new:true,session});
        const updatedRecieverAccount = await Accounts.findOneAndUpdate({id:receiver._id}, {$set:{balance:updatedBalReceiver}}, {new:true,session});

        if(updatedSenderAccount&&updatedRecieverAccount)
        {
            return res.json({success:true, message:"Transaction is Successful!" , balance: {sender:updatedSenderAccount.balance , receiver: updatedRecieverAccount.balance}})
        }
    }catch(e){
        await session.abortTransaction();
        return res.json({success:false, message:"internal Server Error"});
    }finally{
        session.endSession(); // session ends here
    }

});

export default router;