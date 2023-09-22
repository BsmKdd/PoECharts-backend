import express from 'express';
import { getAllLeagues } from '../controllers/leagues';

const router = express.Router();

router.get('/leagues', getAllLeagues);

export default router;
