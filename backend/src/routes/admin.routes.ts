import { Router } from "express";
import {UserController} from "../controllers/admin.controller";

const adminRoutes = Router();

adminRoutes.post("/register",UserController.registerUser );
adminRoutes.post("/login", UserController.adminLogin);
adminRoutes.get("/", UserController.getAdmin );

export default adminRoutes;