import ApiResponse from './apiResponse';

let apiResponse;

beforeEach(() => {
  apiResponse = new ApiResponse({
    headers: 'Headers',
    ok: true,
    status: 200,
    text: () => new Promise((resolve) => { resolve(true); }),
  });
});

describe('Object creation: new apiResponse(params)', () => {
  it('creates a proper object', () => {
    expect(apiResponse).toBeTruthy();
    expect(apiResponse.rawResponse).toBeTruthy();
    expect(apiResponse.extractData).toBeTruthy();
    expect(apiResponse.ok).toBeFalsy();
    expect(apiResponse.status).toBeFalsy();
    expect(apiResponse.text).toBeFalsy();
  });
});

describe('ExtractData', () => {
  it('gets all the needed info', () => {
    apiResponse.extractData().then(() => {
      expect(apiResponse.headers).toBeTruthy();
      expect(apiResponse.ok).toBeTruthy();
      expect(apiResponse.status).toBeTruthy();
      expect(apiResponse.text).toBeTruthy();
    });
  });
});
