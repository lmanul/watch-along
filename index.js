import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 8080;

const videoFile = process.argv[2];
if (!videoFile) {
    throw Error('I need the video to play as an argument');

}
const stat = fs.statSync(videoFile);
const totalSize = stat.size;
const videoData = fs.readFileSync(videoFile);
console.log('Finished reading data of size ' + videoData.length);

app.use('/', express.static('static', {}));

app.get('/r', (req, res) => {
    res.send(videoData);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
