"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signup_1 = __importDefault(require("./routes/signup"));
const signin_1 = __importDefault(require("./routes/signin"));
const update_1 = __importDefault(require("./routes/update"));
const userAcc_1 = __importDefault(require("./routes/userAcc"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/authentication', signup_1.default);
app.use('/authentication', signin_1.default);
app.use('/authentication', update_1.default);
app.use('/accounts', userAcc_1.default);
app.listen(3000);
