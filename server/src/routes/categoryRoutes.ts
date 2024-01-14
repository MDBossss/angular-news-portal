import express, { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();
const categoryController = new CategoryController();

router.use(express.json());

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", verifyToken, categoryController.updateCategory);
router.delete("/:id", verifyToken, categoryController.deleteCategory);

export default router;
