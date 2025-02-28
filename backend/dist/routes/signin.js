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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const auth_1 = require("../auhthentication/auth");
const secretPass = "S3cret";
const router = (0, express_1.Router)();
router.post('/signin', auth_1.isvalidPhoneNumber, auth_1.isvalidPassword, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.body.phoneNumber;
    try {
        console.log("into the try of signin");
        const user = yield db_1.Users.findOne({ phoneNumber: phoneNumber });
        if (!user)
            return res.json({ success: false, message: "Invalid phone number" });
        console.log(user);
        const token = jsonwebtoken_1.default.sign({ phoneNumber }, secretPass, { expiresIn: "2h" });
        return res.json({ success: true, token: token, message: "Token created succesfully!" });
    }
    catch (e) {
        res.json({ success: false, message: "Internal serever error in generating token" });
    }
}));
exports.default = router;
