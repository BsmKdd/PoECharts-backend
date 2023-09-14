import * as fs from 'fs'
import * as fsp from 'fs/promises'

import { parse } from 'csv-parse'
import moment, { Moment } from 'moment'

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
        records.push({ ...row, date: moment(row.date).format('Do MMM YYYY') })
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
        let day1Players = 0

        data = data.map((OneDay: { date: string; players: number }) => {
            const date = moment(OneDay.date, 'Do MMM YYYY')

            for (var league of leaguesData) {
                const start = moment(league.start)
                const end = moment(league.end)

                if (date.isBetween(start, end, undefined, '[]')) {
                    if (date.diff(start, 'days') === 0) day1Players = OneDay.players
                    return {
                        league: league.name,
                        day: date.diff(start, 'days') + 1,
                        retention: Math.round((OneDay.players * 10000) / day1Players) / 100,
                        ...OneDay,
                    }
                }
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
