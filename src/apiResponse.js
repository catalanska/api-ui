export default function apiResponse(response) {
  this.rawResponse = response;

  this.extractData = () => {
    this.headers = this.rawResponse.headers;
    this.ok = this.rawResponse.ok;
    this.status = this.rawResponse.status;
    return this.rawResponse.text().then((responseText) => {
      this.text = responseText;
    });
  };
}
