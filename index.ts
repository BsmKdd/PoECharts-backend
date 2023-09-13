import { addLeague, convertToJSON } from './utils/processing'

const temp = async () => {
    await convertToJSON('./data/chart.csv')
    await addLeague(
        'D:/PoE-project/backend/data/chartProcessed.json',
        'D:/PoE-project/backend/data/leagues.json'
    )
}

temp()
