import { Router } from "express";
import { busController } from "../controllers/bus.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const busRoutes = Router();

busRoutes.post("/register", busController.addBus);
busRoutes.get("/", VerifyToken, busController.getAllBuses);
busRoutes
  .route("/:id")
  .delete(VerifyToken, busController.deleteBusById)
  .put(VerifyToken, busController.updateBusById)
  .get(busController.getBusById);

export default busRoutes;
