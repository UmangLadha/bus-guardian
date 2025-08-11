import { Router } from "express";
import {AdminController} from "../controllers/admin.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const adminRoutes = Router();

adminRoutes.post("/register",AdminController.registerAdmin );
adminRoutes.post("/login", AdminController.adminLogin);
adminRoutes.get("/profile",VerifyToken, AdminController.adminProfile);
adminRoutes.delete("/:id", AdminController.deleteAdminById );

export default adminRoutes;