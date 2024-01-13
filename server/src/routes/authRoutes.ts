import express, { Router } from "express";
import AuthController from "../controllers/AuthController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();
const authController = new AuthController();

router.use(express.json());

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", verifyToken, authController.logout);
router.get("/current", verifyToken, authController.getCurrentUser);

export default router;
