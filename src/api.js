import 'whatwg-fetch';

const domain = 'http://localhost:3000';

export function getMethodsList() {
  return fetch(`${domain}/listOfMethods`, {
    'Content-Type': 'application/json',
  }).then((response) => {
    return response.json();
  });
}

export function callMethod({ method, url, format }) {
  return fetch(`${domain}/${url}`, {
    headers: {
      'Content-Type': format,
      Accept: format,
    },
    method,
  }).then((response) => {
    return response.json();
  });
}
