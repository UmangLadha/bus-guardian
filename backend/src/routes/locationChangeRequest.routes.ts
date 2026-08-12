import { Router } from "express";
import { LocationChangeRequestController } from "../controllers/locationChangeRequest.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const locationChangeRequestRoutes = Router();

// Parent endpoints
locationChangeRequestRoutes.post("/", VerifyToken, LocationChangeRequestController.createRequest);
locationChangeRequestRoutes.get(
  "/parent/:phoneNo",
  VerifyToken,
  LocationChangeRequestController.getRequestsByParent
);

// Admin endpoints
locationChangeRequestRoutes.get("/", VerifyToken, LocationChangeRequestController.getAllRequests);
locationChangeRequestRoutes.patch(
  "/:id",
  VerifyToken,
  LocationChangeRequestController.respondToRequest
);

export default locationChangeRequestRoutes;
