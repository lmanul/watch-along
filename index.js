import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static('static', {}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
