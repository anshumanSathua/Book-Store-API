import express from "express";
import {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genreController";
import { requireAuth } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/adminMiddleware";

const router = express.Router();

// Admin only
/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Genre created
 *       401:
 *         description: Genre already exists
 *       500:
 *         description: Failed to create genre
 */
router.post("/", requireAuth, isAdmin, createGenre);

/**
 * @swagger
 * /api/genres/{id}:
 *   put:
 *     summary: Update a genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Genre updated
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Failed to update genre
 */
router.put("/:id", requireAuth, isAdmin, updateGenre);

/**
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     summary: Delete a genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre ID
 *     responses:
 *       202:
 *         description: Genre deleted
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Failed to delete genre
 */
router.delete("/:id", requireAuth, isAdmin, deleteGenre);

// for all users
/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of all genres
 *       500:
 *         description: Failed to fetch genres
 */
router.get("/", getAllGenres);

/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     summary: Get a genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre ID
 *     responses:
 *       201:
 *         description: Genre found
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Failed to fetch genre
 */
router.get("/:id", getGenreById);

export default router;
