import { Router } from "express";
import { registerAdmin, getAdmin, adminLogin } from "../controllers/admin.controller";

const adminRoutes = Router();

adminRoutes.post("/register", registerAdmin );
adminRoutes.post("/login", adminLogin);
adminRoutes.get("/", getAdmin );

export default adminRoutes;