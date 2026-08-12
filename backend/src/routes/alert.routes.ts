import { Router } from "express";
import { AlertController } from "../controllers/alert.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const alertRoutes = Router();

alertRoutes.post("/", VerifyToken, AlertController.createAlert);
alertRoutes.get("/parent/:phoneNo", AlertController.getAlertsByParent);
alertRoutes.patch("/:id/read", VerifyToken, AlertController.markAsRead);

export default alertRoutes;
