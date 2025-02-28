"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isvalidUserName = isvalidUserName;
exports.isvalidFirstName = isvalidFirstName;
exports.isvalidLastName = isvalidLastName;
exports.isvalidPhoneNumber = isvalidPhoneNumber;
exports.isvalidPassword = isvalidPassword;
exports.jwtAuthentication = jwtAuthentication;
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretPass = "S3cret";
const firstNameSchema = zod_1.default.string().min(1);
const lastNameSchema = zod_1.default.string().min(1);
const phoneNumberSchema = zod_1.default.string().min(10).max(10);
const passwordSchema = zod_1.default.string().min(8).max(20);
const userNameSchema = zod_1.default.string().min(6).max(40);
function isvalidUserName(req, res, next) {
    try {
        const result = userNameSchema.safeParse(req.body.userName);
        if (!result.success) {
            return res.json({ message: "invalid username", success: false });
        }
        next();
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error in username", success: false });
    }
}
function isvalidFirstName(req, res, next) {
    try {
        const result = firstNameSchema.safeParse(req.body.firstName);
        if (!result.success) {
            return res.json({ message: "invalid First Name ", success: false });
        }
        next();
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error in first name", success: false });
    }
}
function isvalidLastName(req, res, next) {
    try {
        const result = lastNameSchema.safeParse(req.body.lastName);
        if (!result.success) {
            return res.json({ message: "invalid last name", success: false });
        }
        next();
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error in last name", success: false });
    }
}
function isvalidPhoneNumber(req, res, next) {
    try {
        const result = phoneNumberSchema.safeParse(req.body.phoneNumber);
        if (!result.success) {
            return res.json({ message: "invalid phone number", success: false });
        }
        next();
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error in valid phone number", success: false });
    }
}
function isvalidPassword(req, res, next) {
    try {
        const result = passwordSchema.safeParse(req.body.password);
        if (!result.success) {
            return res.json({ message: "invalid password", success: false });
        }
        next();
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error in valid password", success: false });
    }
}
function jwtAuthentication(req, res, next) {
    const token = req.headers.authorization;
    if (!token)
        return res.json({ message: "Token unaivalable", success: false });
    try {
        const payload = jsonwebtoken_1.default.verify(token, secretPass);
        req.body.payload = payload;
        next();
    }
    catch (e) {
        return res.json({ message: "Invalid Token", success: false });
    }
}
