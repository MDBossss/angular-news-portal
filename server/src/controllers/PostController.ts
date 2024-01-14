import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { Category, Post, User } from "@prisma/client";

interface PostWithCategoryWithAuthor extends Post {
  category: Category;
  author: User;
}

class PostController {
  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({
        include: { author: true, category: true, comments: true },
      });

      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await prisma.post.findUnique({
        where: { id },
        include: { author: true, category: true, comments: true },
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const post: PostWithCategoryWithAuthor = req.body;

      const newPost = await prisma.post.create({
        data: {
          title: post.title,
          content: post.content,
          categoryId: post.category.id,
          imageUrl: post.imageUrl,
          authorId: post.author.id,
        },
        include: {
          category: true,
          author: true,
        },
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { ...postData }: Post = req.body;
      const updatedPost = await prisma.post.update({
        where: { id },
        data: { ...postData },
      });
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.post.delete({ where: { id } });
      res.status(204).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default PostController;
