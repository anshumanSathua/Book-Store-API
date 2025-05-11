import express from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/adminMiddleware";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

const router = express.Router();

// Admin only routes
/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genres
 *               - publishedYear
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               author:
 *                 type: string
 *                 description: Author ID
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of genre IDs
 *               price:
 *                 type: number
 *               publishedYear:
 *                 type: number
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Missing or invalid fields
 *       404:
 *         description: Author or genres not found
 *       500:
 *         description: Failed to create a book
 */
router.post("/", requireAuth, isAdmin, createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               author:
 *                 type: string
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *               publishedYear:
 *                 type: number
 *     responses:
 *       201:
 *         description: Book updated
 *       404:
 *         description: Book not found
 *       500:
 *         description: Failed to update book
 */
router.put("/:id", requireAuth, isAdmin, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *       401:
 *         description: Unauthorized user
 *       403:
 *         description: Not allowed to delete this book
 *       404:
 *         description: Book not found
 *       500:
 *         description: Failed to delete book
 */
router.delete("/:id", requireAuth, deleteBook);

// For all users
/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with optional filters
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title search (partial match)
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author ID
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Filter by genre ID
 *       - in: query
 *         name: publishedYear
 *         schema:
 *           type: number
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         default: 10
 *     responses:
 *       200:
 *         description: List of books with pagination
 *       500:
 *         description: Failed to fetch books
 */
router.get("/", getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *       500:
 *         description: Failed to fetch book
 */
router.get("/:id", getBookById);

export default router;
