import ApiMethod from './apiMethod';

const { getMockData } = require('./utils/mockData');

let jsonResp;
let xmlResp;
let endpointInfo;
let apiMethod;

beforeEach((done) => {
  endpointInfo = {
    name: 'Foo',
    url: '/foo',
    method: 'GET',
  };
  apiMethod = new ApiMethod(endpointInfo);

  getMockData().then(({ jsonResponse, xmlResponse }) => {
    jsonResp = jsonResponse;
    xmlResp = xmlResponse;
    done();
  });
});

describe('JSON Format', () => {
  beforeEach(() => {
    apiMethod = new ApiMethod(endpointInfo);
  });

  describe('Object creation: new ApiMethod(params)', () => {
    it('creates a proper object', () => {
      expect(apiMethod).toBeTruthy();
      expect(apiMethod.fetchData).toBeTruthy();
      expect(apiMethod.updateFormat).toBeTruthy();
      expect(apiMethod.render).toBeTruthy();
      expect(apiMethod.name).toBe(endpointInfo.name);
      expect(apiMethod.url).toBe(endpointInfo.url);
      expect(apiMethod.httpMethod).toBe(endpointInfo.method);
      expect(apiMethod.format).toBe('application/json');
      expect(apiMethod.fetched).toBe(false);
    });
  });

  describe('Fetch Data', () => {
    it('gets JSON data from server and updates state', (done) => {
      fetch.mockResponseOnce(jsonResp, { status: 200 });
      apiMethod.fetchData().then(() => {
        expect(apiMethod.fetched).toBe(true);
        expect(apiMethod.responseStatus).toBe(200);
        expect(apiMethod.responseText).toBe(jsonResp);
        done();
      });
    });
  });

  describe('Update format', () => {
    it('updates format attr', (done) => {
      fetch.mockResponse(xmlResp, { status: 200 });
      apiMethod.updateFormat('text/xml').then(() => {
        expect(apiMethod.fetched).toBe(true);
        expect(apiMethod.responseStatus).toBe(200);
        expect(apiMethod.responseText).toBe(xmlResp);
        done();
      });
    });
  });
});

describe('XML Format', () => {
  beforeEach(() => {
    apiMethod = new ApiMethod(endpointInfo, 'text/xml');
  });

  describe('Object creation: new ApiMethod(params)', () => {
    it('creates a proper object', () => {
      expect(apiMethod).toBeTruthy();
      expect(apiMethod.fetchData).toBeTruthy();
      expect(apiMethod.updateFormat).toBeTruthy();
      expect(apiMethod.render).toBeTruthy();
      expect(apiMethod.name).toBe(endpointInfo.name);
      expect(apiMethod.url).toBe(endpointInfo.url);
      expect(apiMethod.httpMethod).toBe(endpointInfo.method);
      expect(apiMethod.format).toBe('text/xml');
      expect(apiMethod.fetched).toBe(false);
    });
  });

  describe('Fetch Data', () => {
    it('gets XML data from server and updates state', (done) => {
      fetch.mockResponse(xmlResp, { status: 200 });
      apiMethod.fetchData().then(() => {
        expect(apiMethod.fetched).toBe(true);
        expect(apiMethod.responseStatus).toBe(200);
        expect(apiMethod.responseText).toBe(xmlResp);
        done();
      });
    });
  });
});
