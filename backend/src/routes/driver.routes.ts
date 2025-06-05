import { Router } from "express";
import { DriverController } from "../controllers/driver.controller";

const driverRoutes = Router();

driverRoutes.post("/register", DriverController.registerDriver);
driverRoutes.post("/login", DriverController.loginDriver);
driverRoutes.get("/", DriverController.getDrivers);
driverRoutes
  .route("/:id")
  .put(DriverController.updateDriverById)
  .delete(DriverController.deleteDriverById);
export default driverRoutes;
