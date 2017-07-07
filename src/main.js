import './main.css';
import { getMethodsList } from './utils/api';
import ApiMethod from './apiMethod';

const init = () => {
  getMethodsList().then((methodsList) => {
    methodsList.forEach((endpoint) => {
      const apiMethod = new ApiMethod(endpoint);
      apiMethod.render();
      apiMethod.fetchData();
    });
  });
};

/**
 * Adds an event listener to window &
 * executes code after all assets have been loaded
 */
window.addEventListener('load', init, false);
