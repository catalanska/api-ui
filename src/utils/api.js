import 'whatwg-fetch';

const domain = 'http://localhost:3000';

export function getMethodsList() {
  return fetch(`${domain}/listOfMethods`, {
    'Content-Type': 'application/json',
  }).then(response => response.json());
}

export function callMethod(url, method, format) {
  return fetch(`${domain}/${url}`, {
    headers: {
      'Content-Type': format,
      Accept: format,
    },
    method,
  });
}
