import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password }: User = req.body;

      const existingUser = await prisma.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });

      res.status(201).json(newUser);

      res.status(200).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password }: User = req.body;

      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET as string, {
        expiresIn: "12h",
      });

      res.status(200).json({ message: "Login successfull", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default AuthController;
