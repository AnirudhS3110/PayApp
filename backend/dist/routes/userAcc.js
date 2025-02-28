"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db/db");
const auth_1 = require("../auhthentication/auth");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get('/balance', auth_1.jwtAuthentication, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.body.payload.phoneNumber;
    try {
        const user = yield db_1.Users.findOne({ phoneNumber: phoneNumber });
        const userAccount = yield db_1.Accounts.findOne({ id: user._id });
        const balance = userAccount.balance;
        return res.json({ success: true, balance: balance, username: user.userName, message: "Here is your balance" });
    }
    catch (e) {
        return res.json({ success: false, message: "internal Server Error" });
    }
}));
router.get('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.Users.find({}, { userName: 1, _id: 0 });
        console.log(users);
        return res.json({ success: true, users: users, message: "Here is the list of all users" });
    }
    catch (e) {
        return res.json({ success: false, message: "internal Server Error" });
    }
}));
router.put('/updatebalance', auth_1.jwtAuthentication, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.body.payload.phoneNumber;
    const amount = req.body.amount;
    try {
        const user = yield db_1.Users.findOne({ phoneNumber: phoneNumber });
        const userAccount = yield db_1.Accounts.findOne({ id: user._id });
        const updatedBal = userAccount.balance + amount;
        const updatedAccount = yield db_1.Accounts.findOneAndUpdate({ id: user._id }, { $set: { balance: updatedBal } }, { new: true });
        if (updatedAccount) {
            return res.json({ success: true, message: "Money is debitted to yout account", balance: updatedAccount.balance });
        }
    }
    catch (e) {
        return res.json({ success: false, message: "internal Server Error" });
    }
}));
router.post('/pay', auth_1.jwtAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sPhoneNumber = req.body.payload.phoneNumber;
    const rusername = req.body.userName;
    const amount = req.body.amount;
    const session = yield mongoose_1.default.startSession(); // session starts here
    try {
        console.log("entered try section of payment!");
        const sender = yield db_1.Users.findOne({ phoneNumber: sPhoneNumber }).session(session);
        const receiver = yield db_1.Users.findOne({ userName: rusername }).session(session);
        const senderAccount = yield db_1.Accounts.findOne({ id: sender._id }).session(session);
        const receiverAccount = yield db_1.Accounts.findOne({ id: receiver._id }).session(session);
        if (amount > senderAccount.balance)
            return res.json({ message: "Insufficient balance", success: false });
        const updatedBalSender = senderAccount.balance - amount;
        const updatedBalReceiver = receiverAccount.balance + amount;
        const updatedSenderAccount = yield db_1.Accounts.findOneAndUpdate({ id: sender._id }, { $set: { balance: updatedBalSender } }, { new: true }).session(session);
        const updatedRecieverAccount = yield db_1.Accounts.findOneAndUpdate({ id: receiver._id }, { $set: { balance: updatedBalReceiver } }, { new: true }).session(session);
        if (updatedSenderAccount && updatedRecieverAccount) {
            const today = new Date();
            const date = today.getDate();
            const newTransaction = (yield db_1.Transactions.create({ sender: sender._id, receiver: receiver._id, date: date, amount: amount, noted: false })).$session(session);
            return res.json({ success: true, message: "Transaction is Successful!", balance: { sender: updatedSenderAccount.balance, receiver: updatedRecieverAccount.balance } });
        }
    }
    catch (e) {
        yield session.abortTransaction();
        return res.json({ success: false, message: "internal Server Error" });
    }
    finally {
        session.endSession(); // session ends here
    }
}));
router.get('/notification', auth_1.jwtAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.body.payload.phoneNumber;
    try {
        const user = yield db_1.Users.findOne({ phoneNumber: phoneNumber });
        const newTransactions = yield db_1.Transactions.find({ receiver: user._id, noted: false }, { sender: 1, _id: 0, amount: 1, date: 1, createdAt: 1 }).populate('sender', 'userName').exec();
        const updatedTransactions = yield db_1.Transactions.updateMany({ receiver: user._id, noted: false }, { $set: { noted: true } });
        const resultList = newTransactions.map((transaction) => ({
            senderUsername: transaction.sender,
            amount: transaction.amount,
            date: transaction.date,
            // time: transaction.createdAt
        }));
        if (resultList.length > 0) {
            return res.json({ success: true, notificationList: resultList, message: "Notification list successfully fetched!" });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Inter Server Error(Error in notification)" });
    }
}));
router.get('/notify', auth_1.jwtAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.body.payload.phoneNumber;
    try {
        const user = yield db_1.Users.findOne({ phoneNumber: phoneNumber });
        const newTransactions = yield db_1.Transactions.find({ receiver: user._id, noted: false }, { sender: 1, _id: 0, amount: 1 });
        return res.json({ success: true, count: newTransactions.length, message: "Notification list successfully fetched!" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Inter Server Error(Error in notification)" });
    }
}));
router.get('/transactions', auth_1.jwtAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.body.payload.phoneNumber;
    try {
        const user = yield db_1.Users.findOne({ phoneNumber: phoneNumber });
        const userITransactions = yield db_1.Transactions.find({ receiver: user._id }).populate('sender', 'userName').exec();
        const userOTransactions = yield db_1.Transactions.find({ sender: user._id }).populate('receiver', 'userName').exec();
        const itransactionList = userITransactions.map((transaction) => {
            return {
                sender: transaction.sender,
                amount: transaction.amount,
                date: transaction.date
            };
        });
        const otransactionList = userOTransactions.map((transaction) => {
            return {
                receiver: transaction.receiver,
                amount: transaction.amount,
                date: transaction.date
            };
        });
        return res.json({ success: true, itransactionList: itransactionList, otransactionList: otransactionList, message: "Transaction list successfully fetched!" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Inter Server Error(Error in sending transaction list)" });
    }
}));
exports.default = router;
