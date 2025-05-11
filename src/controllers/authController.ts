import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import jwt from "jsonwebtoken";
import Book, { IBook } from "../models/bookModel";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const lowerCasedEmail = email.toLowerCase();

    const existing = await User.findOne({ lowerCasedEmail });
    if (existing) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }
    const user = await User.create({ name, email: lowerCasedEmail, password });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "Registered", token });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Register failed", error });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ message: "Login success", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

interface UserProfileResponse {
  user: Omit<IUser, "password">;
  createdBooks?: IBook[];
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const response: UserProfileResponse = { user: user.toObject() };

    if (user.role === "admin") {
      const books = await Book.find({ createdBy: req.userId })
        .populate("author", "name")
        .populate("genres", "name");

      response.createdBooks = books;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile", error });
  }
};
