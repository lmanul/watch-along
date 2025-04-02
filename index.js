import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { Readable } from 'stream';

const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static('static', {}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
