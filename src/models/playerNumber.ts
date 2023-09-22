import mongoose, { InferSchemaType, model } from 'mongoose';

const Schema = mongoose.Schema;

const playerNumberSchema = new Schema({
    league: { type: String },
    day: { type: Number },
    retention: { type: Number },
    date: { type: Date, required: true },
    players: { type: Number },
    averagePlayers: { type: Number },
    twitchViewers: { type: Number },
});

type PlayerNumber = InferSchemaType<typeof playerNumberSchema>;

export default model<PlayerNumber>('PlayerNumber', playerNumberSchema);
