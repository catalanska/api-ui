const prettyJSON = (json) => {
  let cleanText = json.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const regExp = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;
  cleanText = cleanText.replace(regExp, (match) => {
    let cls = 'blue';
    if (/^"/.test(match)) {
      cls = 'red';
    } else if (/true|false/.test(match)) {
      cls = 'blue';
    } else if (/null/.test(match)) {
      cls = 'blue';
    }
    return `<span class="${cls}">${match}</span>`;
  });
  return cleanText.trim();
};

/**
 * Creates the initial and stable content of an apiMethod
 * @param  {Object} apiMethod
 * @return {String}
 */
const createItemHtml = apiMethod =>
  `
   <div class="apiMethodHeader">
     <div>
       <strong>${apiMethod.name}</strong>
     </div>
     <div class="selectFormat"></div>
   </div>
   <div class="apiMethodCard">
     <div>
       <strong>${apiMethod.httpMethod}</strong> &nbsp; ${apiMethod.url}
     </div>
   </div>
   <div class="apiMethodCard apiMethodResponse"></div>
`;

/**
 * Creates the html for the new response
 * @param  {Object} apiResponse
 * @return {String}
 */
const createResponseHtml = (apiMethod) => {
  const response = apiMethod.response;
  const headers = response.headers;

  let html = `
    <p>
      <strong>${apiMethod.protocol.toUpperCase()} ${response.status}</strong>
    </p>
  `;

  for (const [key, value] of headers.entries()) {
    html += `
      <p>
        <strong>${key}: </strong> &nbsp;
        <span class="blue">${value}</span>
      </p>
    `;
  }
  html += `
    <pre>
      ${prettyJSON(response.text)}
    </pre>
  `;

  return html;
};

/**
 * Adds a new option to a given select HTMLElement
 * @param {HTMLElement} domElement
 * @param {String} text
 * @param {String} value
 */
const addSelectOption = (domElement, text, value) => {
  const option = document.createElement('option');
  option.value = value;
  option.text = text;
  domElement.appendChild(option);
};

/**
 * Inserts a select element inside a given HTMLElement
 * @param {HTMLElement} domElement
 * @param {Object} apiMethod
 */
const addSelect = (domElement, apiMethod) => {
  const select = document.createElement('select');
  addSelectOption(select, 'JSON', 'application/json');
  addSelectOption(select, 'XML', 'text/xml');
  select.onchange = () => {
    apiMethod.updateFormat(select.value);
  };
  domElement.appendChild(select);
};


/**
 * Creates the html representation and prints to the dom
 * @param  {Object} apiMethod
 * @return {HTMLElement}
 */
export function renderApiMethod(apiMethod) {
  const mainDiv = document.getElementById('items');
  // Create a new li for the items list &
  // fill it with apiMethod's content
  const li = document.createElement('li');
  li.className = 'apiMethod';
  li.innerHTML = createItemHtml(apiMethod);
  // Insert the select tag with the different options and onchange callback
  const selectDiv = li.querySelector('.selectFormat');
  addSelect(selectDiv, apiMethod);
  // Print to the dom
  mainDiv.appendChild(li);
  return li;
}

/**
 * Updates the dom with new data
 * @param  {Object} apiMethod
 */
export function updateResponse(apiMethod) {
  const element = apiMethod.domElement;
  const responseElement = element.querySelector('.apiMethodResponse');
  responseElement.innerHTML = createResponseHtml(apiMethod);
}
