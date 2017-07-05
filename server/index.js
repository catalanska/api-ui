const express = require('express');

const app = express();

const publicMethods = [
  {
    name: 'Advertiser List',
    url: 'advertisers',
    method: 'GET',
  },
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/listOfMethods', (req, res) => {
  res.json(publicMethods);
});

app.get('/advertisers', (req, res) => {
  res.format({
    'text/xml': () => {
      res.send('<p>hey</p>');
    },

    'application/json': () => {
      res.send([
        {
          id: 1,
          name: 'MockAdvertiser',
          external_id: '1',
          impressions: 52721284,
          clicks: 93149,
        },
      ]);
    },

    default: () => {
      // only json or xml are allowed
      res.status(406).send('Not Acceptable');
    },
  });
});

app.listen(3000);
