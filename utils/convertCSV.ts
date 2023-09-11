import * as fs from 'fs';
import { parse } from 'csv-parse';

export const convertToJSON = async (csvFilePath: string): Promise<any> => {
    let records: object[] = [];
    const parser = parse({
        delimiter: ',',
        from_line: 2,
        relax_quotes: true,
        columns: ['Date', 'Players', 'Average Players', 'Twitch Viewers'],
    });
    fs.createReadStream(csvFilePath).pipe(parser);

    for await (const row of parser) {
        records.push(row);
    }

    const JSONContent = JSON.stringify(records);

    fs.writeFile('./data/chart.json', JSONContent, (err) => {
        if (err) return console.log(err);

        console.log(`${csvFilePath} was copied as a JSON.`);
    });
};
