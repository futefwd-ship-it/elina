// import express from 'express';



// import { createGallery, getByCategory, getGallery, addImage,
//      deleteImage, deleteGallery }
//  from '../controllers/galleryControllers';
//  import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
// const router = express.Router();
// // router.post("/", createGallery);
// // router.get("/", getGallery);
// // router.get("/:category", getByCategory);

// // router.put("/:id/add-image", addImage);
// // router.put("/:id/delete-image/:imageId", deleteImage);

// // router.delete("/:id", deleteGallery);

// // export default router;

// // Import our secure auth middleware layers




// // PUBLIC/READ-ONLY: Both Admin and Editors (or guests) can view galleries
// router.get('/', getGallery);
// router.get('/category/:category', getByCategory);

// // PROTECTED (Editor & Admin): Both can create or append images to galleries
// router.post('/', protect, createGallery);
// router.put('/:id/add-image', protect, addImage);

// // RESTRICTED CRITICAL DELETIONS (Admin Only): Editors cannot reach these handlers
// router.put('/:id/delete-image', protect, authorizeRoles('Admin'), deleteImage);
// router.delete('/:id', protect, authorizeRoles('Admin'), deleteGallery);

// export default router;

import express from 'express';
import { 
  createGallery, 
  getGallery, 
  getByCategory, 
  addImage, 
  deleteImage, 
  deleteGallery 
} from '../controllers/galleryControllers.js';

// Import secure auth middleware layers
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router(); // Only ONE declaration here! ✅

// PUBLIC/READ-ONLY
router.get('/',protect, getGallery);
router.get('/category/:category',protect,
  getByCategory);

// PROTECTED (Editor & Admin)
router.post('/', protect, createGallery);
router.put('/:id/add-image', protect, addImage);

// RESTRICTED CRITICAL DELETIONS (Admin Only)
router.put('/:id/delete-image', protect, authorizeRoles('Admin'), deleteImage);
router.delete('/:id', protect, authorizeRoles('Admin'), deleteGallery);

export default router;