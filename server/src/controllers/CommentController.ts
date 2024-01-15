import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { Comment, User } from "@prisma/client";

interface CommentWithAuthor extends Comment {
  author: User;
}

class CommentControler {
  async getCommentsByPostId(req: Request, res: Response) {
    try {
      const { postId } = req.params;

      const comments = await prisma.comment.findMany({
        where: { postId },
        include: { author: true },
        orderBy: {
          updatedAt: "desc",
        },
      });

      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCommentById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const comment = await prisma.comment.findUnique({ where: { id }, include: { author: true } });

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createComment(req: Request, res: Response) {
    try {
      const comment: CommentWithAuthor = req.body;

      const newComment = await prisma.comment.create({
        data: {
          content: comment.content,
          authorId: comment.author.id,
          postId: comment.postId,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        },
        include: {
          author: true,
        },
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { ...commentData }: Comment = req.body;
      const updatedComment = await prisma.comment.update({
        where: { id },
        data: { ...commentData },
      });
      res.status(200).json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.comment.delete({ where: { id } });
      res.status(204).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default CommentControler;
