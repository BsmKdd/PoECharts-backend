import { cleanEnv } from 'envalid';
import { str, port } from 'envalid/dist/validators';

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    STEAM_API_KEY: str(),
    POE_STEAM_APP_ID: str(),
    POESESSID: str(),
});
