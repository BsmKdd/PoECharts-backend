import { AxiosError } from 'axios';
import { sendAxiosRequest } from '../config/axiosConfig';
import env from '../utils/validateEnv';

const url = 'https://api.pathofexile.com/league';

interface getCurrentPoeLeagues {
    data?: poeLeagues | undefined;
    errorMessage: string | undefined;
    status: number;
}

export interface poeLeague {
    id: string;
    startAt: Date;
    endAt: Date;
}

type poeLeagues = { leagues: poeLeague[] };
// -8
export const getCurrentPoeLeagues = async (): Promise<getCurrentPoeLeagues> => {
    try {
        const response = await sendAxiosRequest<poeLeagues>({
            method: 'get',
            url,
            config: {
                headers: {
                    Cookie: `POESESSID=${env.POESESSID}`,
                    'User-Agent': 'poecharts/0.0.1 (contact: bsmkdd@outlook.com).',
                },
            },
        });

        return {
            data: response.data,
            errorMessage: undefined,
            status: 200,
        };
    } catch (error) {
        const axiosError = error as AxiosError;

        return {
            errorMessage: axiosError.message,
            data: undefined,
            status: axiosError.status ?? 500,
        };
    }
};
