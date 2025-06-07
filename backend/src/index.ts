import express from 'express';
import cors from 'cors';
import { connectDB } from './Database/database';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.routes';
import { authenticate } from './middlewares/auth.middleware';
import driverRoutes from './routes/driver.routes';
import studentRoutes from './routes/student.routes';
import busRoutes from './routes/bus.routes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//database connection
const mongodb_url = process.env.MONGODB_ATLAS_URL!;
connectDB(mongodb_url);

app.get('/protected', authenticate , (req,res)=>{
    res.json({ message:"welcome to the protected data route", user: req.user });
});

//routes
app.use("/api/users", adminRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/bus", busRoutes);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
}); 