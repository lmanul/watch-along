import express from 'express';
import session from 'express-session';

import ClientManager from './clientmanager.js';
import getTickResponse from './tick.js';

const clientManager = new ClientManager();

const app = express();
const port = process.env.PORT || 8080;

app.use(session({
    secret: 'watch-along-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use('/', express.static('static', {}));

app.use('/tick', (request, response) => {
    if (!request.session.clientId) {
        const newId = clientManager.registerClient();
        request.session.clientId = newId;
        console.log('Registered ' + newId);
    }
    console.log(request.query.t);
    console.log('Tick from ' + request.session.clientId);
    response.send(getTickResponse());
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
