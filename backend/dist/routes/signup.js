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
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db/db");
const auth_1 = require("../auhthentication/auth");
const router = (0, express_1.Router)();
function getHashedPass(pass) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashed = yield bcrypt_1.default.hash(pass, 10);
            return hashed;
        }
        catch (e) {
            throw (e);
        }
    });
}
router.post('/signup', auth_1.isvalidUserName, auth_1.isvalidFirstName, auth_1.isvalidLastName, auth_1.isvalidPhoneNumber, auth_1.isvalidPassword, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, firstName, lastName, phoneNumber, password } = req.body;
    console.log("Came into signup router");
    try {
        const hashedPass = yield getHashedPass(password);
        const user = yield db_1.Users.findOne({ phoneNumber: phoneNumber });
        if (user)
            return res.json({ success: false, message: "iuser with the phone number already exists" });
        const newUser = yield db_1.Users.create({ userName, firstName, lastName, phoneNumber, password: hashedPass });
        const newAccount = yield db_1.Accounts.create({ id: newUser._id, balance: 10000 });
        return res.status(200).json({ success: true, message: "user created!" });
    }
    catch (e) {
        return res.status(500).json({ success: false, message: "internal Server error" });
    }
}));
exports.default = router;
