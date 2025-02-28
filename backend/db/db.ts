import mongoose , {Schema, Document , Model, Date}from "mongoose";


mongoose.connect("mongodb+srv://anirudh:idk1012@cluster0.snaqz.mongodb.net/payTM")


const UserSchema = new mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    phoneNumber: String,
    password: String
})

const AccountsSchema = new mongoose.Schema({
    id: {type:Schema.Types.ObjectId, ref:"Users"},
    balance: Number
})

const TransactionSchema = new mongoose.Schema({
    sender: {type:Schema.Types.ObjectId, ref:"Users"}, 
    receiver:{type:Schema.Types.ObjectId, ref:"Users"},
    date: Date,
    amount: Number,
    noted:Boolean 
},{timestamps:true})

export interface ITransaction extends Document{
    sender:string;
    receiver:string;
    date:Date;
    amount:number;
    noted:boolean;
}

export interface IUser extends Document {
    userName:string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
  }

export interface IAccounts extends Document{
    id: string,
    balance: number
}
export const Users: Model<IUser> = mongoose.model<IUser>("Users", UserSchema);
export const Accounts: Model<IAccounts> = mongoose.model<IAccounts>("Accounts", AccountsSchema);
export const Transactions: Model<ITransaction> = mongoose.model<ITransaction>("Transactions",TransactionSchema)






