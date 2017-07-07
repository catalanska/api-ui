const fs = require('fs');

const getMockData = () => {
  let jsonResponse;
  let xmlResponse;

  const promise = new Promise((resolve, reject) => {
    fs.readFile('./data/response.json', 'utf8', (err, data) => {
      if (err) reject(err);
      jsonResponse = data;
      fs.readFile('./data/response.xml', 'utf8', (xmlError, xmlData) => {
        if (xmlError) reject(xmlError);
        xmlResponse = xmlData;
        resolve({
          jsonResponse,
          xmlResponse,
        });
      });
    });
  });
  return promise;
};

module.exports.getMockData = getMockData;
