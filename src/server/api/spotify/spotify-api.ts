// Libs
import SpotifyClient from './spotify-client';
import { logError } from '../../utils/loggin';

// APIs
export default function spotifyApi(server) {
    server.get('/api/v1/search', async (req, res) => {
        try {
            const spotifyApiClient = SpotifyClient.getClient();
            const { text } = req.query;

            spotifyApiClient.searchTracks(text).then(
                function onSuccess(data) {
                    res.send(data.body);
                },
                function onFailure(err) {
                    logError(err);
                },
            );
        } catch (err) {
            logError(err);
        }
    });
}
