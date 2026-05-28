import express from "express";

import {
    getAllFloors,
    createFloors,
    updateBulkFloors,
    updateFloors
} from "../controllers/projectdetailsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllFloors);

router.post("/", protect, createFloors);

router.patch("/:id", updateFloors);

router.patch("/", updateBulkFloors);

export default router;