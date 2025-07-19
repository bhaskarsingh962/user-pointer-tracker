import express from 'express';
import { claimPoints, getHistory } from '../controllers/claimController.js';
const router = express.Router();

router.post('/', claimPoints);
router.get('/history', getHistory);

export default router;
