import { Router } from "express";
import { TripController } from "../controllers/trip.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const tripRoutes = Router();

tripRoutes.post("/start", VerifyToken, TripController.startTrip);
tripRoutes.patch("/:id/location", VerifyToken, TripController.updateLocation);
tripRoutes.patch("/:id/complete", VerifyToken, TripController.completeTrip);
tripRoutes.get("/active/:busId", TripController.getActiveTrip);

export default tripRoutes;
