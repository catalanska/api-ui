import { getMethodsList } from './api';
import {
  createApiMethod,
  fetchData,
} from './apiMethod';

getMethodsList().then((methodsList) => {
  methodsList.forEach((endpoint) => {
    const apiMethod = createApiMethod(endpoint);
    fetchData(apiMethod).then((completedApiMethod) => {
      //TODO render completedApiMethod
    });
  });
});
