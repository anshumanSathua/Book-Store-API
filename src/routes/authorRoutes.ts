import express from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";
import { requireAuth } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/adminMiddleware";

const router = express.Router();

// Author routes (Admin only)
/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
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
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created
 *       500:
 *         description: Failed to create author
 */
router.post("/", requireAuth, isAdmin, createAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated
 *       404:
 *         description: Author not found
 *       500:
 *         description: Failed to update author
 */
router.put("/:id", requireAuth, isAdmin, updateAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       202:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       500:
 *         description: Failed to delete author
 */
router.delete("/:id", requireAuth, isAdmin, deleteAuthor);

// Author route (for all users)
/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 *       500:
 *         description: Failed to fetch authors
 */
router.get("/", getAllAuthors);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get a single author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 *       500:
 *         description: Failed to fetch author
 */
router.get("/:id", getAuthorById);

export default router;
