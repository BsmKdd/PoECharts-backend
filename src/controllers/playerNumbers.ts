import { RequestHandler } from 'express';
import PlayerNumber from '../models/playerNumber';

export const getAllPlayerNumbers: RequestHandler = async (req, res, next) => {
    try {
        const playerNumbers = await PlayerNumber.find().sort({ date: 1 });
        res.status(200).json(playerNumbers);
    } catch (error) {
        next(error);
    }
};
