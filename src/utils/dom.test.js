import {
  renderApiMethod,
  updateResponse,
} from './dom';

describe('DOM Utils', () => {
  let div;
  const apiMethod = {
    name: 'Foo',
    url: '/foo',
    method: 'GET',
    protocol: 'http',
    response: {
      headers: {
        entries: () => [],
      },
      ok: true,
      status: 200,
      text: '[{ "id": 1, "name": "MockAdvertiser" }]',
    },
  };

  beforeEach(() => {
    div = document.createElement('ul');
    div.setAttribute('id', 'items');
    document.body.appendChild(div);
  });
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });
  describe('renderApiMethod', () => {
    it('should create a new li with the proper structure', () => {
      const li = renderApiMethod(apiMethod);
      expect(li.querySelector('.apiMethodHeader').outerHTML).toContain('application/json');
      expect(li.querySelector('.apiMethodHeader').outerHTML).toContain('text/xml');
      expect(li.querySelector('.apiMethodResponse').outerHTML)
        .toEqual('<div class="apiMethodCard apiMethodResponse"></div>');
    });
  });

  describe('updateResponse', () => {
    it('should create a new li with the proper structure', () => {
      const li = renderApiMethod(apiMethod);
      apiMethod.domElement = li;
      const responseDiv = updateResponse(apiMethod);
      expect(responseDiv.outerHTML)
        .toContain('200');
    });
  });
});
