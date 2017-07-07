import ApiResponse from './apiResponse';
import { callMethod } from './utils/api';
import { renderApiMethod, updateResponse } from './utils/dom';

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
    this.response = new ApiResponse(response);
    return this.response.extractData();
  };

  this.updateFormat = (newFormat) => {
    this.format = newFormat;
    return this.fetchData();
  };

  this.fetchData = () => callMethod(this.url, this.httpMethod, this.format)
    .then(response => setResponse(response))
    .then(() => {
      setFetched(true);
      updateResponse(this);
    });

  this.render = () => {
    this.domElement = renderApiMethod(this);
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
