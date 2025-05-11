import { Request, Response } from "express";
import Book from "../models/bookModel";
import Author from "../models/authorModel";
import Genre from "../models/genreModel";
import User from "../models/userModel";

// Create a Book (Admins only)
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, author, genres, price, publishedYear } =
      req.body;

    if (!title || !author || !genres || !publishedYear || !price) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const foundAuthor = await Author.findById(author);
    if (!foundAuthor) {
      res.status(404).json({ message: "Auhor not foundInvalid author Id!" });
      return;
    }

    if (!Array.isArray(genres)) {
      res.status(404).json({ message: "Genres must be an array of genre IDs" });
      return;
    }

    const foundGenres = await Genre.find({ _id: { $in: genres } });
    if (foundGenres.length !== genres.length) {
      res.status(400).json({ message: "One or more genre IDs are invalid" });
      return;
    }

    const book = await Book.create({
      title,
      description,
      author,
      genres,
      price,
      publishedYear,
      createdBy: req.userId,
    });

    res.status(201).json({ message: "Book created...", book });
  } catch (error) {
    res.status(500).json({ message: "Failed to crete a book!", error });
  }
};

// Get all Books
// This route will also work for query based search and filtering
export const getBooks = async (req: Request, res: Response) => {
  try {
    const {
      title,
      author,
      genres,
      minPrice,
      maxPrice,
      publishedYear,
      page = "1",
      limit = "10",
    } = req.query;

    const filters: any = {};

    if (title) {
      filters.title = { $regex: title, $options: "i" }; // case-insensitive match
    }

    if (author) {
      filters.author = author;
    }

    if (genres) {
      filters.genres = { $in: Array.isArray(genres) ? genres : [genres] };
    }

    if (publishedYear) {
      filters.publishedYear = Number(publishedYear);
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const books = await Book.find(filters)
      .populate("author", "name")
      .populate("genres", "name")
      .skip(skip)
      .limit(Number(limit));

    const total = await Book.countDocuments(filters);

    res.status(200).json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      books,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books", error: err });
  }
};

// Get A Book By Id
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author", "name")
      .populate("genres", "name");
    if (!book) {
      res.status(404).json({ message: "Book not found!" });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book!", error });
  }
};

// Update A Book (Admins only)
export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      res.status(404).json({ message: "Book not found!" });
      return;
    }

    res.status(201).json({ message: "Book Updated..." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update book!", error });
  }
};

// Delete A Book (Admins only)
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found!" });
      return;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }

    if (book.createdBy.toString() !== req.userId) {
      res
        .status(403)
        .json({ message: "You are not allowed to delete this book" });
      return;
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted..." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book!", error });
  }
};
