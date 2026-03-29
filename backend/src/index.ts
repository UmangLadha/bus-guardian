import express from "express";
import cors from "cors";
import { connectDB } from "./Database/database";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.routes";
import { VerifyToken } from "./middlewares/verifyToken";
import driverRoutes from "./routes/driver.routes";
import studentRoutes from "./routes/student.routes";
import busRoutes from "./routes/bus.routes";
import routes from "./routes/busRoute.route";

dotenv.config();
export const app = express();
app.use(cors({
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    process.env.FRONTEND_URL!],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());

//database connection
connectDB();

app.get("/protected", VerifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed", user: req.encodedPayload });
});

//routes
app.use("/api/admin", adminRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/route", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
