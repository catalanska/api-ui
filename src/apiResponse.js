/**
 * apiResponse holds the destructured response data from fetch
 * @param {Object} response Object returned by fetch
 */
export default function apiResponse(response) {
  this.rawResponse = response;

  /**
   * extractData destructures the response data
   * @return {Promise} to be resolved when response text has been fully retrieved
   */
  this.extractData = () => {
    this.headers = this.rawResponse.headers;
    this.ok = this.rawResponse.ok;
    this.status = this.rawResponse.status;
    return this.rawResponse.text().then((responseText) => {
      this.text = responseText;
    });
  };
}
