import express from "express";

import passwordRecoveryController from "../controllers/passwordRecoveryController.js";

const router = express.Router();

router.route("/recoveryCode").post(passwordRecoveryController.recovery);
router.route("/verifyCode").post(passwordRecoveryController.verifyCode);
router.route("/updatePassword").post(passwordRecoveryController.updatePassword);

export default router;
