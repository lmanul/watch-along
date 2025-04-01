import express from 'express';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { Readable } from 'stream';

const bufferToStream = (buffer) => {
  return new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      }
  });
}

// const chunkSize = 65536;
const chunkSize = 65536000;

const app = express();
const port = process.env.PORT || 8080;

const videoFile = process.argv[2];
if (!videoFile) {
    throw Error('I need the video to play as an argument');

}
const stat = fs.statSync(videoFile);
const totalSize = stat.size;
const metadata = {};
const videoData = fs.readFileSync(videoFile);

let chunkCount = Math.ceil(totalSize / chunkSize);
console.log(`${chunkCount} chunks of ${chunkSize} each`)

const videoStream = bufferToStream(videoData);
console.log(videoData);
let videoDurationSeconds;

ffmpeg.ffprobe(videoStream, (err, metadata) => {

    if (err) {
        throw Error('Could not read video');
    }

    videoDurationSeconds = metadata.format.duration;

    console.log(`Duration: ${videoDurationSeconds} seconds`);
});

console.log('Finished reading data of size ' + videoData.length);

app.use('/', express.static('static', {}));

app.get('/i', (req, res) => {
  res.send([chunkCount, videoDurationSeconds].join('|'));
});

app.get('/c/:index', (req, res) => {
  const index = parseInt(req.params.index);
  console.log(index);
  const start = index * chunkSize;
  res.send(videoData.slice(start, start + chunkSize));
});

app.get('/r', (req, res) => {
    res.send(videoData);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
