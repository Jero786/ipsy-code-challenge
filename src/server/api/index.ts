import spotifyApi from './spotify/spotify-api';
import accessTokenSpotify from './spotify/spotify-access-token.legacy';
import SpotifyClient from './spotify/spotify-client';

export default server => {
    spotifyApi(server);
    accessTokenSpotify(server);
};

export const onServerStarted = () => {
    SpotifyClient.init();
};
