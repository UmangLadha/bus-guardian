import { Router } from "express";
import {AdminController} from "../controllers/admin.controller";

const adminRoutes = Router();

adminRoutes.post("/register",AdminController.registerAdmin );
adminRoutes.post("/login", AdminController.adminLogin);

export default adminRoutes;