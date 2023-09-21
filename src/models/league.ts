import mongoose, { InferSchemaType, model } from 'mongoose';

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    version: { type: String, required: true },
    expansion: { type: String },
    league: { type: String, required: true },
    name: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date },
});

type League = InferSchemaType<typeof leagueSchema>;

export default model<League>('League', leagueSchema);
