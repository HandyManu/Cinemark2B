import express from "express";
import empleadosController from "../controllers/empleadosController.js";

const router = express.Router();
router.route("/").get(empleadosController.getEmpleados)

router.route("/:id").delete(empleadosController.deleteEmpleado)
.put(empleadosController.updateEmpleado);

export default router;