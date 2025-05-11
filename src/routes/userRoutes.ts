import expres from "express";
import { promoteToAdmin } from "../controllers/userController";
import { isAdmin } from "../middlewares/adminMiddleware";
import { requireAuth } from "../middlewares/authMiddleware";

const router = expres.Router();

/**
 * @swagger
 * /api/users/{id}/promote:
 *   put:
 *     summary: Promote a user to admin role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be promoted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully promoted to admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: User is already an Admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to promote user
 */
router.put("/:id/promote", requireAuth, isAdmin, promoteToAdmin);

export default router;
