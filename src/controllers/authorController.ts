import { Request, Response } from "express";
import Author from "../models/authorModel";

// Create Author (Admin only)
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bio } = req.body;
    const author = await Author.create({ name, bio });
    res.status(201).json({ message: "Author created", author });
  } catch (error) {
    res.status(500).json({ message: "Failed to create author!" });
  }
};

// Get All Authors
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Authors!" });
  }
};

// Get Single Author
export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.status(404).json({ message: "Author not found!" });
      return;
    }

    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch author", error });
  }
};

// Update Author(Admin only)
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) {
      res.status(404).json({ message: "Author not found!" });
      return;
    }
    res.status(201).json({ message: "Author updated..." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update author!", error });
  }
};

// Delete Author (Admin only)
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      res.status(404).json({ message: "Author not found!" });
      return;
    }
    res.status(202).json({ message: "Author deleted..." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete author!", error });
  }
};
