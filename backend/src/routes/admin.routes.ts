import { Router } from "express";
import {UserController} from "../controllers/admin.controller";

const adminRoutes = Router();

adminRoutes.post("/register",UserController.registerUser );
adminRoutes.post("/login", UserController.adminLogin);
adminRoutes.get("/", UserController.getAllAdmin );
adminRoutes.delete("/:id", UserController.deleteAdminById );

export default adminRoutes;