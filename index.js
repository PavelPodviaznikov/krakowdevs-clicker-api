const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbService = require('./services/db.service');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

dbService.init();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/clicks', async (req, res) => {
  const clicks = await dbService.getClicks();
  
  req.header["Access-Control-Allow-Origin"] = "*";

  res.send(`${clicks}`);
});

app.post('/click', (req, res) => {
  const clicks = req.body.clicks;
  dbService.saveClicks(clicks);

  res.send(`${clicks}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });