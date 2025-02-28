"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = exports.Accounts = exports.Users = void 0;
const mongoose_1 = __importStar(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://anirudh:idk1012@cluster0.snaqz.mongodb.net/payTM");
const UserSchema = new mongoose_1.default.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    password: String
});
const AccountsSchema = new mongoose_1.default.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    balance: Number
});
const TransactionSchema = new mongoose_1.default.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    date: Date,
    amount: Number,
    noted: Boolean
}, { timestamps: true });
exports.Users = mongoose_1.default.model("Users", UserSchema);
exports.Accounts = mongoose_1.default.model("Accounts", AccountsSchema);
exports.Transactions = mongoose_1.default.model("Transactions", TransactionSchema);
