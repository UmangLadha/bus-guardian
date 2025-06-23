import { Router } from "express";
import { busController } from "../controllers/bus.controller";

const busRoutes = Router();

busRoutes.post("/register", busController.addBus);
busRoutes.get("/", busController.getAllBuses);
busRoutes.route("/:id").delete(busController.deleteBusById).put(busController.updateBusById).get(busController.getBusById)

export default busRoutes;