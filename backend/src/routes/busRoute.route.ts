import { Router } from "express";
import { routeController } from "../controllers/route.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const routes = Router();

routes.post("/register", routeController.addRoute);
routes.get("/", VerifyToken, routeController.getBusRoutes);
routes.delete("/:id", VerifyToken, routeController.deleteRoute);

export default routes;