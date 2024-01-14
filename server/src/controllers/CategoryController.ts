import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { Category } from "@prisma/client";

class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();

      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const category = await prisma.category.findUnique({ where: { id } });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { ...categoryData }: Category = req.body;
      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { ...categoryData },
      });
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.category.delete({ where: { id } });
      res.status(204).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default CategoryController;
