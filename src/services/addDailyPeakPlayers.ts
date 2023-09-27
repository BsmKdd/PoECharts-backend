import cron from 'node-cron';
import moment from 'moment';

export const everySecond = async () => {
    cron.schedule(
        '* * * * * *',
        () => {
            console.log(moment().utc().subtract(1, 'days').format('YYYY-MM-DD'));
        },
        { timezone: 'Etc/UTC' }
    );
};
