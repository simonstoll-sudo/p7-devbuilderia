import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getAllPaniers, getPanierById, getDistributions } from '../controllers/paniersController.js';

const router = express.Router();

router.get('/', getAllPaniers);
router.get('/distributions', requireAuth, getDistributions);
router.get('/:id', getPanierById);

export default router;
