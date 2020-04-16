/* eslint-disable no-console */
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import jsonToXml from 'jsontoxml';
// import fs from 'fs';
import estimatorData from './estimator';


const app = express();

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

// app.get('/api/v1/on-covid-19/logs?', async (req, res) {
//   fs.readFile('.logger.log', 'utf8', (err, data) => {
//     if(err) throw err;
//     res.set('Conttent-Type', 'text/plain')
//     res.send();
//   })
// })


const port = process.env.PORT || 4000;
module.exports = app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
