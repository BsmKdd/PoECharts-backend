import { AxiosError } from 'axios';
import { sendAxiosRequest } from '../config/axiosConfig';
import env from '../utils/validateEnv';

const url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/';

interface SteamAPIReply {
    response: {
        player_count: number;
    };
}
interface getNumberOfCurrentSteamPlayers {
    data: SteamAPIReply['response'] | undefined;
    errorMessage: string | undefined;
    status: number;
}

export const getNumberOfCurrentPoeSteamPlayers =
    async (): Promise<getNumberOfCurrentSteamPlayers> => {
        try {
            const response = await sendAxiosRequest<SteamAPIReply>({
                method: 'get',
                url,
                config: { params: { format: 'json', appid: env.POE_STEAM_APP_ID } },
            });

            return {
                data: response.data.response,
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
