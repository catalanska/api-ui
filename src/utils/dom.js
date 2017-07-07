const createItemHtml = apiMethod =>
  `
   <div class="apiMethodHeader">
     <div>
       <strong>${apiMethod.name}</strong>
     </div>
     <div class="selectFormat"></div>
   </div>
   <div class="apiMethodDescription">
     <div>
       ${apiMethod.url}
     </div>
     <div>
       ${apiMethod.format}
     </div>
   </div>
   <div class="apiMethodResponse"></div>
`;

const createResponseHtml = response =>
`<div>
  <strong>${response.status}</strong>
</div>
<div>
  ${response.text}
</div>
`;

const addSelectOption = (domElement, text, value) => {
  const option = document.createElement('option');
  option.value = value;
  option.text = text;
  domElement.appendChild(option);
};

const addSelect = (domElement, apiMethod) => {
  const select = document.createElement('select');
  addSelectOption(select, 'JSON', 'application/json');
  addSelectOption(select, 'XML', 'text/xml');
  select.onchange = () => {
    apiMethod.updateFormat(select.value);
  };
  domElement.appendChild(select);
};

const addItemContent = (domElement, apiMethod) => {
  const currentItems = document.getElementsByClassName('apiMethod');
  const li = document.createElement('li');
  const itemId = `apiMethod${currentItems.length + 1}`;
  li.id = itemId;
  li.class = 'apiMethod';
  li.innerHTML = createItemHtml(apiMethod);
  domElement.appendChild(li);
  return li;
};

export function renderApiMethod(apiMethod) {
  const mainDiv = document.getElementById('methods');
  const element = addItemContent(mainDiv, apiMethod);
  const selectDiv = document.querySelector(`#${element.id} .selectFormat`);
  addSelect(selectDiv, apiMethod);
  return element;
}

export function updateResponse(apiMethod) {
  const element = apiMethod.domElement;
  const responseElement = element.querySelector('.apiMethodResponse');
  responseElement.innerHTML = createResponseHtml(apiMethod.response);
  // TODO update result
}
