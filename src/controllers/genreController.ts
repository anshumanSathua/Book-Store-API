import { Request, Response } from "express";
import Genre from "../models/genreModel";

// Create Genre (Admins only)
export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const existing = await Genre.findOne({ name });
    if (existing) {
      res.status(401).json({ message: "Genre already exists!" });
      return;
    }

    const genre = await Genre.create({ name });
    res.status(200).json({ message: "Genre created...", genre });
  } catch (error) {
    res.status(500).json({ message: "Failed to create genre!", error });
  }
};

// Get all genres
export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch genres!", error });
  }
};

// Get genre by Id
export const getGenreById = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      res.status(404).json({ message: "genre not found!" });
      return;
    }
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch genre!", error });
  }
};

// Update Genre (Admins only)
export const updateGenre = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre) {
      res.status(404).json({ message: "Genre not found!" });
      return;
    }

    res.status(200).json({ message: "Genre Updates...", genre });
  } catch (error) {
    res.status(500).json({ message: "Failed to update genre!", error });
  }
};

// Delete Genre (Admins only)
export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) {
      res.status(404).json({ message: "Genre not found!" });
      return;
    }

    res.status(202).json({ message: "Genre deleted..." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete genre!", error });
  }
};
