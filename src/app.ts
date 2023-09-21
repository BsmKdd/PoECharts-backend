import 'dotenv/config';
import express from 'express';
import { convertToJSON, addLeague } from './utils/processing';
import leaguesRoutes from './routes/leagues-routes';

const temp = async () => {
    await convertToJSON('./src/data/chart.csv');
    await addLeague('./src/data/chartProcessed.json', './src/data/leagues.json');
};

temp();

const app = express();

app.use(express.json());

app.use('/api/poe', leaguesRoutes);

export default app;
