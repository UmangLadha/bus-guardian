import { Router } from "express";
import { routeController } from "../controllers/route.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const routes = Router();

routes.post("/register", routeController.addRoute);
routes.get("/", VerifyToken, routeController.getBusRoutes);
routes
  .route("/:id")
  .put(VerifyToken, routeController.updateRouteById)
  .get(VerifyToken, routeController.getRouteById)
  .delete(VerifyToken, routeController.deleteRoute);

export default routes;
