import express from "express";
import registerClientesController from "../controllers/registerClientes.js";

const router = express.Router();

router.route("/").post(registerClientesController.registerCliente);
router.route("/verifyCodeEmail").post(registerClientesController.verifyCodeEmail);

export default router;