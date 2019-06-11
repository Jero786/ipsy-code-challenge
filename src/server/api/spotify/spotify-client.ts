// Resources
// Libs
import * as SpotifyWebApi from 'spotify-web-api-node';

interface SpotifyClient {
    init: () => void;
    setAccessToken: (string) => void;
    getClient: () => any;
    lastTokenValid: any;
    spotifyApiClient: any;
    getLastToken: () => string;
}

const spotifyClient: SpotifyClient = {
    lastTokenValid: null,
    spotifyApiClient: null,

    init: () => {
        this.spotifyApiClient = new SpotifyWebApi({
            clientId: process.env.API_SPOTIFY_CLIENT_ID,
            clientSecret: process.env.API_SPOTIFY_CLIENT_SECRET_ID,
            redirectUri: process.env.API_SPOTIFY_CLIENT_REDIRECT_URLc,
        });
    },

    setAccessToken: accessToken => {
        this.lastTokenValid = accessToken;
        this.spotifyApiClient.setAccessToken(accessToken);
    },

    getLastToken() {
        return this.lastTokenValid;
    },

    getClient: () => {
        if (!this.spotifyApiClient) {
            console.error('Error caused by: Spotify client not initialized yet!');
        }
        return this.spotifyApiClient;
    },
};

export default spotifyClient;
