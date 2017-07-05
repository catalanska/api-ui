import { callMethod } from './api';

export function createApiMethod({ name, url, method }) {
  return Object.assign({}, { name, url, method }, {
    fetched: false,
    format: 'application/json',
  });
}

function setResponse(apiMethod, response) {
  return Object.assign({}, apiMethod, { response });
}

export function fetchData(apiMethod) {
  // TODO call api method and parse result
  return new Promise((resolve) => {
    callMethod(apiMethod)
      .then((response) => {
        setResponse(apiMethod, response);
        resolve(Object.assign({}, apiMethod, { response, fetched: true }));
      });
  });
}
