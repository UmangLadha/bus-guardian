import { Router } from "express";
import { StudentsController } from "../controllers/student.controller";
import { VerifyToken } from "../middlewares/verifyToken";

const studentRoutes = Router();

studentRoutes.post("/register", StudentsController.addStudent);
studentRoutes.post("/login", VerifyToken, StudentsController.loginStudent);
studentRoutes.get("/", VerifyToken, StudentsController.getAllStudents);
studentRoutes
  .route("/:id")
  .delete(VerifyToken, StudentsController.deleteStudentById)
  .put(VerifyToken, StudentsController.updateStudentById);

export default studentRoutes;
