import 'dotenv/config';
import express from 'express';
import { convertToJSON, addLeague } from './utils/processing';
import leaguesRoutes from './routes/leagues';
import playerNumbersRoutes from './routes/playerNumbers';
import { addDailyPeakPlayers } from './services/addDailyPeakPlayers';

const temp = async () => {
    await convertToJSON('./src/data/chart.csv');
    await addLeague('./src/data/chartProcessed.json', './src/data/leagues.json');
};

temp();

const app = express();

app.use(express.json());

addDailyPeakPlayers();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/api/poe', leaguesRoutes);
app.use('/api/poe', playerNumbersRoutes);

export default app;
