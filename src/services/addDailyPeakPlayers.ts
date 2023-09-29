import cron from 'node-cron';
import moment from 'moment';
import PlayerNumber from '../models/playerNumber';
import { getNumberOfCurrentPoeSteamPlayers } from '../controllers/steam_';
import { getCurrentPoeLeagues, poeLeague } from '../controllers/poe';

export const addDailyPeakPlayers = async () => {
    let currentPlayers = 0;
    let currentPeak = 0;
    let currentLeague: poeLeague | undefined;

    cron.schedule(
        '0 0 1 * * *',
        async () => {
            try {
                const currentLeagues = (await getCurrentPoeLeagues()).data?.leagues;
                if (currentLeagues) currentLeague = currentLeagues[currentLeagues?.length - 8];

                const lastDay = moment().utc().subtract(1, 'days');

                const newRecord = await PlayerNumber.create({
                    ...(currentLeague &&
                        lastDay.isBefore(currentLeague.endAt) && { league: currentLeague.id }),
                    date: lastDay.format('YYYY-MM-DD'),
                    day: lastDay.diff(currentLeague?.startAt, 'days') + 2,
                    players: currentPeak,
                });

                console.log(newRecord);

                currentPeak = 0;
            } catch (error) {
                console.log(error);
            }
        },
        { timezone: 'Etc/UTC' }
    );

    cron.schedule(
        '* */30 * * * *',
        async () => {
            currentPlayers = (await getNumberOfCurrentPoeSteamPlayers()).data?.player_count ?? 0;
            currentPeak = Math.max(currentPlayers, currentPeak);
            console.log(`Current players: ${currentPlayers} Daily peak is: ${currentPeak}`);
        },
        { timezone: 'Etc/UTC' }
    );
};
