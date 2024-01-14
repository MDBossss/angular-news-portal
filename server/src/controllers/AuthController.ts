import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

class AuthController {
  async getCurrentUser(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;

      const currentUser = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!currentUser) {
        return res.status(401).json({ message: "There is no such user." });
      }

      res.status(200).json(currentUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password }: User = req.body;

      console.log(firstName, lastName, email, password);

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

      console.log(
        `User logged in, id: ${user.id} with token ${token} that expires in ${new Date(
          Date.now() + 43200 * 1000
        )}`
      );

      res.cookie("jwtToken", token, {
        expires: new Date(Date.now() + 43200 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.status(200).json({ message: "Login successfull", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async logout(req: Request, res: Response) {
    res.cookie("jwtToken", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    console.log(res);
    return res.status(200).json({ message: "Success" });
  }
}

export default AuthController;
