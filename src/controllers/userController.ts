import { Request, Response } from "express";
import User from "../models/userModel";

export const promoteToAdmin = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.role === "admin") {
      res.status(400).json({ message: "User is already an Admin!" });
      return;
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: "User promoted to Admin..." });
  } catch (error) {
    res.status(500).json({ message: "Failed to promote user", error });
  }
};
