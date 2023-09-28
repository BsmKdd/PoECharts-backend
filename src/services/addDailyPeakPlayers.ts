import cron from 'node-cron';
import moment from 'moment';
import PlayerNumber from '../models/playerNumber';
import { getNumberOfCurrentPoeSteamPlayers } from '../controllers/steam_';
import { RequestHandler } from 'express';

export const updatePlayerNumbersDaily: RequestHandler = async (req, res, next) => {
    let currentPlayers = 0;
    let currentPeak = 0;

    cron.schedule(
        '0 0 1 * * *',
        async () => {
            try {
                const newRecord = await PlayerNumber.create({
                    // my data
                });

                currentPeak = 0;

                res.status(201).json(newRecord);
            } catch (error) {
                next(error);
            }
        },
        { timezone: 'Etc/UTC' }
    );

    cron.schedule(
        '0 */30 * * * *',
        async () => {
            currentPlayers = (await getNumberOfCurrentPoeSteamPlayers()).data?.player_count ?? 0;
            currentPeak = Math.max(currentPlayers, currentPeak);
            console.log(`Current players: ${currentPlayers} Daily peak is: ${currentPeak}`);
        },
        { timezone: 'Etc/UTC' }
    );
};
