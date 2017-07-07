const addSelectOption = (domElement, text, value) => {
  const option = document.createElement('option');
  option.value = value;
  option.text = text;
  domElement.appendChild(option);
};

const createSelect = (apiMethod) => {
  const selectList = document.createElement('select');
  addSelectOption(selectList, 'JSON', 'application/json');
  addSelectOption(selectList, 'XML', 'text/xml');
  selectList.onchange = () => {
    apiMethod.updateFormat(selectList.value);
  };
  return selectList;
};

const addItemHeader = (domElement, apiMethod) => {
  const header = document.createElement('div');
  const select = createSelect(apiMethod);
  const textName = document.createTextNode(apiMethod.name);
  header.appendChild(textName);
  header.appendChild(select);
  domElement.appendChild(header);
};

const addItemBody = (domElement, apiMethod) => {
  const body = document.createElement('div');
  const contentToPrint = `
      <div>
        ${apiMethod.url}
      </div>
      <div>
        ${apiMethod.format}
      </div>
      <div>
        <strong>${apiMethod.responseStatus}</strong>
      </div>
      <div>
        ${apiMethod.responseText}
      </div>
    `;
  body.innerHTML = contentToPrint;
  domElement.appendChild(body);
};

export function renderApiMethod(apiMethod) {

  const div = document.createElement('li');
  addItemHeader(div, apiMethod);
  addItemBody(div, apiMethod);
  const element = document.getElementById('methods');
  element.appendChild(div);
}

export function updateRender(apiMethod) {
  const element = document.getElementById(apiMethod.id);
  // TODO update result
}
