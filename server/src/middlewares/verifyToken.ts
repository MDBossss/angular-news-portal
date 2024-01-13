import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      return res.status(401).json("Missing token.");
    }

    const decoded: any = jwt.verify(token, process.env.SECRET as string);
    (req as any).userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json("Bad token.");
  }
};

export default verifyToken;
