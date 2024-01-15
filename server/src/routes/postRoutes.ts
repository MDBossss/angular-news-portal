import express, { Router } from "express";
import PostController from "../controllers/PostController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();
const postController = new PostController();

router.use(express.json());

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.get("/user/:userId", postController.getUserPosts);
router.post("/", verifyToken, postController.createPost);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);

export default router;
