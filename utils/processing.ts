import * as fs from 'fs'
import * as fsp from 'fs/promises'

import { parse } from 'csv-parse'

export const convertToJSON = async (csvFilePath: string): Promise<void> => {
    let records: object[] = []
    const parser = parse({
        delimiter: ',',
        from_line: 2,
        relax_quotes: true,
        cast: true,
        trim: true,
        columns: ['date', 'players', 'averagePlayers', 'twitchViewers'],
    })
    fs.createReadStream(csvFilePath).pipe(parser)

    for await (const row of parser) {
        records.push({ ...row, date: convertDate(row.date) })
    }

    const JSONContent = JSON.stringify(records)

    fs.writeFile('./data/chartProcessed.json', JSONContent, (err) => {
        if (err) return console.log(err)

        console.log(`${csvFilePath} was copied as a JSON.`)
    })
}

export const addLeague = async (
    jsonFilePath: string,
    leagueDataFilePath: string
): Promise<void> => {
    let data: any = await fsp.readFile(jsonFilePath, 'utf-8')
    let leaguesData: any = await fsp.readFile(leagueDataFilePath, 'utf-8')

    try {
        data = JSON.parse(data)
        leaguesData = JSON.parse(leaguesData)

        data = data.map((OneDay: { date: string }) => {
            const date = new Date(OneDay.date).getTime()

            for (var league of leaguesData) {
                const start = new Date(league.start).getTime()
                const end = new Date(league.end).getTime()
                if (date >= start && date <= end) return { league: league.name, ...OneDay }
            }

            return OneDay
        })

        data = JSON.stringify(data)

        await fsp.writeFile(jsonFilePath, data)
        console.log(`${jsonFilePath} was modified.`)
    } catch (err) {
        throw err
    }
}

export const convertDate = (
    date: string,
    options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string => {
    return new Date(date).toLocaleDateString('en-GB', options)
}
