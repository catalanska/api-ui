import ApiResponse from './apiResponse';
import { callMethod } from './utils/api';
import { renderApiMethod, updateResponse } from './utils/dom';

const defaultFormat = 'application/json';

/**
 * apiMethod is the object that holds all the necessary data
 * @param  {String} name                   Title for the method
 * @param  {String} url                    Url to call
 * @param  {String} method                 Http method to use
 * @param  {String} protocol               Protocol to use: http, https
 * @param  {String} [format=defaultFormat] Format in which we want the data
 */

export default function apiMethod({ name, url, method, protocol }, format = defaultFormat) {
  this.name = name;
  this.url = url;
  this.httpMethod = method;
  this.fetched = false;
  this.format = format;
  this.protocol = protocol;

  const setFetched = (fetched) => {
    this.fetched = fetched;
  };

  /**
   * Creates a new ApiResponse object and stores it
   * @param {Object} response Object returned by fetch
   */
  const setResponse = (response) => {
    this.response = new ApiResponse(response);
    return this.response.extractData();
  };

  /**
   * Method called when user selects a new format for a certain apiMethod
   * @param  {String} newFormat
   * @return {Promise} returns a promise resolved when data and dom are completely updated
   */
  this.updateFormat = (newFormat) => {
    this.format = newFormat;
    return this.fetchData();
  };

  /**
   * fetchData can be called at any moment when we want to fetch and update content
   * @return {Promise} returns a promise resolved when data and dom are completely updated
   */
  this.fetchData = () => callMethod(this.url, this.httpMethod, this.format)
    .then(response => setResponse(response))
    .then(() => {
      setFetched(true);
      updateResponse(this);
    });

  /**
   * Creates the representation for apiMethod and inserts in the dom
   * Stores reference to the html element for future updates
   */
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
