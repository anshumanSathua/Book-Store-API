import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.userId);
  if (!user || user.role !== "admin") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }
  next();
};
