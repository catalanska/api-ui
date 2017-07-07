import { callMethod } from './utils/api';
import { renderApiMethod, updateRender } from './utils/dom';

const defaultFormat = 'application/json';

export default function apiMethod({ name, url, method }, format = defaultFormat) {
  this.name = name;
  this.url = url;
  this.httpMethod = method;
  this.fetched = false;
  this.format = format;

  const setFetched = (fetched) => {
    this.fetched = fetched;
  };

  const setResponse = (response) => {
    this.responseStatus = response.status;
    return response.text().then((responseText) => {
      this.responseText = responseText;
    });
  };

  this.updateFormat = (newFormat) => {
    this.format = newFormat;
    return this.fetchData().then(() => {
      updateRender(this);
    });
  };

  this.fetchData = () => {
    const promise = callMethod(this.url, this.httpMethod, this.format)
        .then(response => setResponse(response))
        .then(() => setFetched(true));
    return promise;
  };

  this.render = () => {
    renderApiMethod(this);
  };
}

apiMethod.prototype.updateFormat = (format) => {
  this.updateFormat(format);
};

apiMethod.prototype.fetchData = () => {
  this.fetchData();
};

apiMethod.prototype.render = () => {
  this.render();
};
