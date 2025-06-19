import { Router } from "express";
import { StudentsController } from "../controllers/student.controller";

const studentRoutes = Router();

studentRoutes.post("/register", StudentsController.addStudent);
studentRoutes.post("/login", StudentsController.loginStudent);
studentRoutes.get("/", StudentsController.getStudents);
studentRoutes.route("/:id").delete(StudentsController.deleteStudentById).put(StudentsController.updateStudentById)

export default studentRoutes;