import { Router } from "express";
import { DriverController } from "../controllers/driver.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const driverRoutes = Router();

driverRoutes.post("/register", DriverController.registerDriver);
driverRoutes.post("/login", DriverController.loginDriver);
driverRoutes.get("/", VerifyToken, DriverController.getAllDrivers);
driverRoutes
  .route("/:id")
  .put(VerifyToken, DriverController.updateDriverById)
  .delete(VerifyToken, DriverController.deleteDriverById);
export default driverRoutes;
