import { Router } from "express";
import { SchoolController } from "../controllers/school.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const schoolRoutes = Router();

schoolRoutes.get("/", SchoolController.getSchoolInfo);
schoolRoutes.post("/", VerifyToken, SchoolController.upsertSchoolInfo);

export default schoolRoutes;
