import express from 'express';
import { getAllPlayerNumbers } from '../controllers/playerNumbers';

const router = express.Router();

router.get('/playerNumbers', getAllPlayerNumbers);

export default router;
