import { Request, Response } from "express";
import Book from "../models/bookModel";
import Order from "../models/orderModel";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { bookIds } = req.body;

    if (!Array.isArray(bookIds) || bookIds.length === 0) {
      res.status(400).json({ message: "Books Ids are required!" });
      return;
    }

    const books = await Book.find({ _id: { $in: bookIds } });
    if (books.length !== bookIds.length) {
      res.status(404).json({ message: "One or more books are not found!" });
      return;
    }

    const totalPrice = books.reduce((sum, book) => sum + book.price, 0);
    const newOrder = await Order.create({
      user: userId,
      books: bookIds,
      totalPrice,
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ user: userId })
      .populate("books", "title price coverImage")
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      res.status(404).json({ message: "No orders yet!" });
      return;
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};
