import express, { Router } from "express";
import CommentController from "../controllers/CommentController";
import verifyToken from "../middlewares/verifyToken";

const router: Router = express.Router();
const commentController = new CommentController();

router.use(express.json());

router.get("/post/:postId", commentController.getCommentsByPostId);
router.get("/:id", commentController.getCommentById);
router.post("/", commentController.createComment);
router.put("/:id", verifyToken, commentController.updateComment);
router.delete("/:id", verifyToken, commentController.deleteComment);

export default router;
