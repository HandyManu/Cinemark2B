import express from "express";
import registerClientesController from "../controllers/registerClientes.js";

const router = express.Router();

router.route("/").post(registerClientesController.register);
router.route("/verifyCodeEmail").post(registerClientesController.verifyEmail);

export default router;