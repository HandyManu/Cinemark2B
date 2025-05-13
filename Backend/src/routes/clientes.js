import express from "express";
import clientesController  from "../controllers/clientesController.js";

const router = express.Router();

router.route("/").get(clientesController.getClientes)

router.route("/:id").delete(clientesController.deleteCliente)
.put(clientesController.updateCliente);

export default router;