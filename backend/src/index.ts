import express from 'express';
import cors from 'cors';
import { connectDB } from './Database/database';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.routes';
import { authenticate } from './middlewares/auth.middleware';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//database connection fn
connectDB();

app.get('/protected', authenticate , (req,res)=>{
    res.json({ message:"welcome to the protected data route", user: req.user });
});

//routes
app.use("/auth", adminRoutes);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
}); 