import { NextFunction, Request, Response, Router } from "express";
import { Accounts, IAccounts, ITransaction, IUser, Transactions, Users } from "../db/db";
import { jwtAuthentication } from "../auhthentication/auth";
import mongoose from "mongoose"
const router = Router();

router.get('/balance',jwtAuthentication, async(req: Request, res: Response , next:NextFunction):Promise <any>=>{
    const phoneNumber = req.body.payload.phoneNumber;

    try{
        const user = await Users.findOne({phoneNumber:phoneNumber}) as IUser;
        const userAccount = await Accounts.findOne({id:user._id}) as IAccounts;
        const balance = userAccount.balance;
        return res.json({success:true, balance: balance, username:user.userName , message:"Here is your balance"})
    }catch(e){
        return res.json({success:false, message:"internal Server Error"});
    }

})

router.get('/users',async(req: Request, res: Response , next:NextFunction):Promise <any>=>{


    try{
        const users =await Users.find({},{userName:1 , _id:0})
        console.log(users);
        return res.json({success:true,users:users , message:"Here is the list of all users"})
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

router.post('/pay',jwtAuthentication, async(req: Request, res: Response ):Promise <any>=>{
    const sPhoneNumber = req.body.payload.phoneNumber;
    const rusername = req.body.userName;
    const amount = req.body.amount;

    const session = await mongoose.startSession(); // session starts here

    try{
        console.log("entered try section of payment!")
        const sender = await Users.findOne({phoneNumber:sPhoneNumber} ).session(session) as IUser;
        const receiver = await Users.findOne({userName:rusername} ).session(session) as IUser;

        const senderAccount = await Accounts.findOne({id:sender._id} ).session(session) as IAccounts;
        const receiverAccount = await Accounts.findOne({id:receiver._id} ).session(session) as IAccounts;

        if(amount>senderAccount.balance)
            return res.json({message:"Insufficient balance", success:false})

        const updatedBalSender = senderAccount.balance - amount;
        const updatedBalReceiver = receiverAccount.balance + amount;
       

        const updatedSenderAccount = await Accounts.findOneAndUpdate({id:sender._id}, {$set:{balance:updatedBalSender}}, {new:true}).session(session);
        const updatedRecieverAccount = await Accounts.findOneAndUpdate({id:receiver._id}, {$set:{balance:updatedBalReceiver}}, {new:true}).session(session);

        if(updatedSenderAccount&&updatedRecieverAccount)
        {
            const today = new Date();
            const date = today.getDate();
            const newTransaction = (await Transactions.create({sender:sender._id,receiver:receiver._id,date:date,amount:amount,noted:false})).$session(session);
            return res.json({success:true, message:"Transaction is Successful!" , balance: {sender:updatedSenderAccount.balance , receiver: updatedRecieverAccount.balance}})
        }
    }catch(e){
        await session.abortTransaction();
        return res.json({success:false, message:"internal Server Error"});
    }finally{
        session.endSession(); // session ends here
    }

});

interface IUpdatedTransaction {

    receiver?: string;
    sender: IUser|string; // sender is of type IUser (which includes userName)
    amount: number;
    noted?: boolean;
  }
export interface IUserUpdated  {
    userName:string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    password?: string;
  }
  

router.get('/notification',jwtAuthentication, async(req: Request, res: Response):Promise <any>=>{

    const phoneNumber = req.body.payload.phoneNumber;
    try{
        const user = await Users.findOne({phoneNumber:phoneNumber}) as IUser;
        const newTransactions = await Transactions.find({receiver:user._id, noted:false},{sender:1,_id:0, amount:1, date:1, createdAt:1}).populate('sender','userName').exec();
        const updatedTransactions = await Transactions.updateMany({receiver:user._id, noted:false},{$set:{noted:true}});

        const resultList = newTransactions.map((transaction) => ({
            senderUsername: transaction.sender  ,
            amount: transaction.amount,
            date: transaction.date,
            // time: transaction.createdAt
          }))

        if(resultList.length>0)
        {
            return res.json({success:true, notificationList:resultList, message:"Notification list successfully fetched!"});
        }
    }catch(e)
    {
        console.log(e);
        return res.status(500).json({message:"Inter Server Error(Error in notification)"});
    }

})

router.get('/notify',jwtAuthentication, async(req: Request, res: Response):Promise <any>=>{

    const phoneNumber = req.body.payload.phoneNumber;
    try{
        const user = await Users.findOne({phoneNumber:phoneNumber}) as IUser;
        const newTransactions = await Transactions.find({receiver:user._id, noted:false},{sender:1,_id:0, amount:1});

        return res.json({success:true, count: newTransactions.length, message:"Notification list successfully fetched!"});
        
    }catch(e)
    {
        console.log(e);
        return res.status(500).json({message:"Inter Server Error(Error in notification)"});
    }

})

router.get('/transactions',jwtAuthentication, async(req: Request, res: Response):Promise <any>=>{

    const phoneNumber = req.body.payload.phoneNumber;
    try{
        const user = await Users.findOne({phoneNumber:phoneNumber}) as IUser;
        const userITransactions = await Transactions.find({receiver:user._id}).populate('sender','userName').exec();
        const userOTransactions = await Transactions.find({sender:user._id}).populate('receiver','userName').exec();


        const itransactionList = userITransactions.map((transaction)=>{
            return {
                sender:transaction.sender,
                amount:transaction.amount,
                date:transaction.date
            }
        });

        const otransactionList = userOTransactions.map((transaction)=>{
            return {
                receiver:transaction.receiver,
                amount:transaction.amount,
                date:transaction.date
            }
        });

        return res.json({success:true, itransactionList:itransactionList, otransactionList:otransactionList, message:"Transaction list successfully fetched!"});
        
    }catch(e)
    {
        console.log(e);
        return res.status(500).json({message:"Inter Server Error(Error in sending transaction list)"});
    }

})

export default router;