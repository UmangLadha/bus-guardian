import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/database';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;
dotenv.config(); //importing env file
app.use(cors());
app.use(express.json());
connectDB();

app.get('/',(req,res)=>{
    res.send("hello, welcome to the backend of busGuardian");
});

app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
});