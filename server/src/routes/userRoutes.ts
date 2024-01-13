import express, { Router } from "express";
import UserController from "../controllers/UserController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();
const userController = new UserController();

router.use(express.json());

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);

export default router;
