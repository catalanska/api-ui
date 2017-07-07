const express = require('express');
const { getMockData } = require('../src/utils/mockData');

getMockData().then(({ jsonResponse, xmlResponse }) => {
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
        res.send(xmlResponse);
      },

      'application/json': () => {
        res.send(jsonResponse);
      },

      default: () => {
        // only json or xml are allowed
        res.status(406).send('Not Acceptable');
      },
    });
  });

  app.listen(3000);
});
