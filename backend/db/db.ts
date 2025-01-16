import mongoose , {Schema, Document , Model}from "mongoose";


mongoose.connect("mongodb+srv://anirudh:idk1012@cluster0.snaqz.mongodb.net/payTM")


const UserSchema = new mongoose.Schema({
    userName:String,
    firstName:String,
    lastName:String,
    phoneNumber: Number,
    password: String
})

const AccountsSchema = new mongoose.Schema({
    id: {type:Schema.Types.ObjectId, ref:"Users"},
    balance: Number
})

export interface IUser extends Document {
    userName:string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    password: string;
  }

export interface IAccounts extends Document{
    id: string,
    balance: number
}
export const Users: Model<IUser> = mongoose.model<IUser>("Users", UserSchema);
export const Accounts: Model<IAccounts> = mongoose.model<IAccounts>("Accounts", AccountsSchema);






