import './main.css';
import { getMethodsList } from './utils/api';
import ApiMethod from './apiMethod';

getMethodsList().then((methodsList) => {
  methodsList.forEach((endpoint) => {
    const apiMethod = new ApiMethod(endpoint);
    apiMethod.render();
    apiMethod.fetchData();
  });
});
