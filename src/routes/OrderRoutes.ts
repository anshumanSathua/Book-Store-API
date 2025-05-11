import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookIds
 *             properties:
 *               bookIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of book IDs
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Books Ids are required
 *       404:
 *         description: One or more books not found
 *       500:
 *         description: Failed to place order
 */
router.post("/", requireAuth, createOrder);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get orders of the logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       404:
 *         description: No orders found
 *       500:
 *         description: Failed to fetch orders
 */
router.get("/my-orders", requireAuth, getMyOrders);

export default router;
