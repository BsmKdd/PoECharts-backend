import { RequestHandler } from 'express';
import League from '../models/league';

export const getAllLeagues: RequestHandler = async (req, res, next) => {
    try {
        const leagues = await League.find().sort({ start: 1 });
        res.status(200).json(leagues);
    } catch (error) {
        next(error);
    }
};
