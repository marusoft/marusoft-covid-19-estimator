/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import jsonToXml from 'jsontoxml';
import logger from 'morgan';
import fs from 'fs';
import estimatorData from './src/estimator';


const app = express();


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.txt'), { flags: 'a' });
logger.token('response', (req, res) => {
  if (!res._header || !req._startAt) return '';
  const diff = process.hrtime(req._startAt);
  let ms = diff[0] * 1e3 + diff[1] * 1e-6;
  ms = ms.toFixed(0);
  return `${ms.toString().padStart(2, '0')}ms`;
});

app.use(
  logger(':method :url :status :response\n', {
    stream: accessLogStream
  })
);

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/api/v1/on-covid-19/', async (req, res) => {
  const use = await estimatorData(req.body);
  res.status(200).json({
    data: use.data,
    impact: use.impact,
    severeImpact: use.severeImpact
  });
});

app.post('/api/v1/on-covid-19/json', async (req, res) => {
  const use = await estimatorData(req.body);
  res.status(200).json({
    data: use.data,
    impact: use.impact,
    severeImpact: use.severeImpact
  });
});

app.post('/api/v1/on-covid-19/xml', async (req, res) => {
  const use = await estimatorData(req.body);
  res.header('content-Type', 'application/xml; charset=UTF-8');
  res.send(jsonToXml(use));
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  fs.readFile('access.txt', (err, data) => {
    if (err) throw err;
    res.header('Content-Type', 'text/plain');
    res.send(data);
  });
});


const port = process.env.PORT || 2424;
module.exports = app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
