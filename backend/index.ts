import express from "express"
import { Router } from "express"
import cors from "cors";
import signup from "./routes/signup"
import signin from "./routes/signin";
import update from "./routes/update";
import accounts from "./routes/userAcc"


const app = express();
app.use(express.json())
app.use(cors());
app.use('/authentication',signup);
app.use('/authentication',signin);
app.use('/authentication',update);
app.use('/accounts',accounts);

app.listen(3000)