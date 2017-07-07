const fs = require('fs');

/**
 * method used to read the files and return mock data
 * @return {Promise} Resolves when all files are read and sends an Object with all the data
 **/
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
