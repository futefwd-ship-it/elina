import express from 'express'

import { getAllFloors, createFloors,updateBulkFloors,updateFloors } from "../controllers/projectdetailsController.js";

import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router(); // Only ONE declaration here! ✅

router.get("/",protect, getAllFloors);
router.post("/",protect, createFloors);
router.patch("/:id",updateFloors);
router.patch("/",updateBulkFloors);

export default router;