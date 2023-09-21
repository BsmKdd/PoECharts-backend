import 'dotenv/config';
import express from 'express';
import { convertToJSON, addLeague } from './utils/processing';

const temp = async () => {
    await convertToJSON('./src/data/chart.csv');
    await addLeague('./src/data/chartProcessed.json', './src/data/leagues.json');
};

const app = express();

temp();

export default app;
