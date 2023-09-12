import * as fs from 'fs'
import { parse } from 'csv-parse'

export const convertToJSON = async (csvFilePath: string): Promise<any> => {
    let records: object[] = []
    const parser = parse({
        delimiter: ',',
        from_line: 3016,
        relax_quotes: true,
        cast: true,
        trim: true,
        columns: ['date', 'players', 'averagePlayers', 'twitchViewers'],
    })
    fs.createReadStream(csvFilePath).pipe(parser)

    for await (const row of parser) {
        records.push(row)
        console.log(row)
    }

    const JSONContent = JSON.stringify(records)

    fs.writeFile('./data/chart.json', JSONContent, (err) => {
        if (err) return console.log(err)

        console.log(`${csvFilePath} was copied as a JSON.`)
    })
}
