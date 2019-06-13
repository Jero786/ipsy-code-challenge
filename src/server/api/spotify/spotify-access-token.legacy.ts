import * as request from 'request';
import * as querystring from 'querystring';
import SpotifyClient from './spotify-client';
import {logError} from '../../utils/loggin';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

export default app => {
    // @ts-ignore
    app.get('/api/v1/refresh-token', function(req, res) {
        const clientId = process.env.API_SPOTIFY_CLIENT_ID;
        const redirectUrl = process.env.API_SPOTIFY_CLIENT_REDIRECT_URL;

        try {
            const state = generateRandomString(16);
            res.cookie(stateKey, state);

            const scope = process.env.API_SPOTIFY_SCOPES;
            const queryString = querystring.stringify({
                response_type: 'code',
                client_id: clientId,
                scope,
                redirect_uri: redirectUrl,
                state,
            });

            // your application requests authorization

            res.redirect(`${process.env.API_SPOTIFY_URL_AUTHORIZE}?${queryString}`);
        } catch (err) {
            logError(err.message);
        }
    });

    app.get('/callback', function(req, res) {
        const clientId = process.env.API_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.API_SPOTIFY_CLIENT_SECRET_ID;
        const redirectUrl = process.env.API_SPOTIFY_CLIENT_REDIRECT_URL;

        // your application requests refresh and access tokens
        // after checking the state parameter
        const code = req.query.code || null;
        const state = req.query.state || null;
        const storedState = req.cookies ? req.cookies[stateKey] : null;

        if (state === null || state !== storedState) {
            res.redirect(
                `/#${querystring.stringify({
                    error: 'state_mismatch',
                })}`,
            );
        } else {
            res.clearCookie(stateKey);
            const authOptions = {
                url: process.env.API_SPOTIFY_URL_TOKEN,
                form: {
                    code,
                    redirect_uri: redirectUrl,
                    grant_type: 'authorization_code',
                },
                headers: {
                    Authorization: `Basic ${new Buffer(`${clientId}:${clientSecret}`).toString('base64')}`,
                },
                json: true,
            };

            request.post(authOptions, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    const { access_token } = body;
                    const { refresh_token } = body;

                    SpotifyClient.setAccessToken(refresh_token);

                    initJobRefreshToken(refresh_token);

                    const options = {
                        url: process.env.API_SPOTIFY_URL_ME,
                        headers: { Authorization: `Bearer ${access_token}` },
                        json: true,
                    };

                    // use the access token to access the Spotify Web API
                    // @ts-ignore
                    request.get(options, function(error, response, body) {
                        console.log(body);
                    });

                    // we can also pass the token to the browser to make requests from there
                    res.redirect(
                        `/welcome?${querystring.stringify({
                            access_token,
                            refresh_token,
                        })}`,
                    );
                } else {
                    res.redirect(
                        `/#${querystring.stringify({
                            error: 'invalid_token',
                        })}`,
                    );
                }
            });
        }
    });

    app.get('/refresh_token', function(req, res) {
        const clientId = process.env.API_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.API_SPOTIFY_CLIENT_SECRET_ID;

        // requesting access token from refresh token
        const { refresh_token } = req.query;
        const authOptions = {
            url: process.env.API_SPOTIFY_URL_TOKEN,
            headers: { Authorization: `Basic ${new Buffer(`${clientId}:${clientSecret}`).toString('base64')}` },
            form: {
                grant_type: 'refresh_token',
                refresh_token,
            },
            json: true,
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                const { access_token } = body;
                // @ts-ignore
                SpotifyClient.initializeWithToken(access_token);
                res.send({
                    access_token,
                });
            }
        });
    });
};

function initJobRefreshToken(refreshToken) {
    setInterval(function() {
        const clientId = process.env.API_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.API_SPOTIFY_CLIENT_SECRET_ID;

        const authOptions = {
            url: process.env.API_SPOTIFY_URL_TOKEN,
            headers: { Authorization: `Basic ${new Buffer(`${clientId}:${clientSecret}`).toString('base64')}` },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
            json: true,
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                const { access_token } = body;
                SpotifyClient.setAccessToken(access_token);
            }
        });
    }, +process.env.API_SPOTIFY_TOKEN_INTERVAL_MS);
}
