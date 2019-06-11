import * as express from 'express';
import * as next from 'next';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';

import apiServices, { onServerStarted } from './api';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src/client', dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 8888;

app.prepare()
    .then(() => {
        const server = express();

        // middleware
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(cors());
        server.use(cookieParser());

        if (dev) {
            server.use(morgan('dev'));
        }

        // initialize register APIs
        apiServices(server);

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, err => {
            if (err) throw err;

            console.log(`> Ready on http://localhost:${port}`);

            onServerStarted();
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
